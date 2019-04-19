/*
refs:
Simon Grimm - How to Build Ionic 4 app with offline mode - https://www.youtube.com/watch?v=CFoG0xkgVlE
*/
import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, from, of} from 'rxjs';
import {switchMap, finalize} from 'rxjs/operators';

const STORAGE_REQ_KEY = 'storedreq';

interface StoredRequest {
    url: string;
    type: string;
    data: any;
    time: number;
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class OfflineManagerService {

    constructor(private storage: Storage, private toastController: ToastController, private http: HttpClient) {
    }

    private sendRequests(operations: StoredRequest[]) {
        const obs = [];

        for (let op of operations) {
            console.log('Make on request: ', op);
            const oneObs = this.http.request(op.type, op.url, op.data);
            obs.push(oneObs);
        }
        ;

        // Send out all local events and return once they are finished.s
        return forkJoin(obs);

    }

    public checkForEvents(): Observable<any> {
        return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
            switchMap(storedOperations => {
                const storedObj = JSON.parse(storedOperations);
                if (storedObj && storedObj.length > 0) {
                    return this.sendRequests(storedObj).pipe(
                        finalize(async () => {
                            const toast = await this.toastController.create({
                                message: `Local data succesfully synced to API`,
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            this.storage.remove(STORAGE_REQ_KEY);
                        })
                    );
                } else {
                    console.log('No local event');
                    return of(false);
                }
            })
        );
    }

    public async storeRequest(url, type, data): Promise<any> {
        const toast = await this.toastController.create({
            message: 'Your data are stored localy because you seem to be offline.',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

        const action: StoredRequest = {
            url: url,
            type: type,
            data: data,
            time: new Date().getTime(),
            id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        };

        return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
            let storedObj = JSON.parse(storedOperations);

            if (storedObj) {
                storedObj.push(action);
            } else {
                storedObj = [action];
            }

            console.log('Local request stored: ', action);
            return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
        });
    }

}
