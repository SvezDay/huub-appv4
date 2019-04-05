import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private loadingController: LoadingController) {
        
    }
}
