import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app'
import 'firebase/firestore';

import { Observable, of, throwError, from } from 'rxjs'; // from convert promise to Observable
import { switchMap, catchError, retry, tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { OfflineManagerService } from './offline-manager.service';
import { NetworkService, ConnectionStatus } from './network.service';


import { User } from '../_interfaces/user';
import { Data } from '../_interfaces/data';

// import {AuthService} from './auth.service';
// import {IntercomService} from './intercom.service';


const REST_STORAGE_KEY = 'specialkey';
//const REST_URL = "http://localhost:5000/rest";
const REST_URL = "https://huub-restv3.herokuapp.com/rest";

@Injectable()
export class RestService {
    // apiUrl: string = `https://${environment.firebase.authDomain}/api`;

    constructor( private http: HttpClient
        // , private auth: AuthService
        , private networkService: NetworkService
        , private offlineManagerService: OfflineManagerService
        // , private connectionStatus: ConnectionStatus
        , private storage: Storage
    ){ }

        private handleError(error: any, caught:Observable<any>):Observable<any>{
            console.log('error', error);
            return error;
        }
        private getToken(){
            // Pour s'assurer que le user est signin
            // Firebase Instance Token (FCM Token) identify a specific device != Auth ID Token user

            // return new Promise((resolve, reject)=>{
            //     firebase.auth().onAuthStateChanged(user => {
            //         if(user){
            //             console.log("check the FCM Token", user.getIdToken())
            //             // resolve(user.refreshToken);
            //             resolve(user.getIdToken())
            //         }else{
            //             resolve(null);
            //         }
            //     })
            // })

            return new Promise((resolve, reject)=>{
                firebase.auth().currentUser.getIdToken(/*Force refresh token*/ true).then(idToken=>{
                    console.log("check the Auth ID Token: ", idToken)
                    resolve(idToken);
                })
            })
        }
        private getHeader(...param){
            return new Promise((resolve, reject)=>{
                // let headers;
                this.getToken()
                .then(token=>{
                    // console.log('getHeader ============================================ ', JSON.stringify(token))
                    // return new HttpHeaders({
                    let head = new HttpHeaders({
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': JSON.stringify(token) });
                        // return {headers: head};
                        return head;
                    }).then(headers=>{
                        // console.log("secodn headers check ", headers)
                        if(param.length >= 1){
                            for(let item in param[0]){
                                headers = headers.set(item, param[0][item]);
                            }
                        };
                        return headers;
                    }).then(headers=>{
                        console.log("resolve getHeader: ", headers)
                        resolve({headers: headers});
                    }).catch(err=>{
                        reject(err);
                    })
                })
            }
            private setLocalData(key:string, data:any):void{
                this.storage.set(REST_STORAGE_KEY+'-'+key, data);
            }
            // private getLocalData(key:string): Observable<any>{
            //     return from(this.storage.get(REST_STORAGE_KEY+'-'+key));
            // }
            private getLocalData(key:string): Promise<any>{
                return this.storage.get(REST_STORAGE_KEY+'-'+key);
            }
            private deleteLocalData(key:string, data:any):void{
                // DO IT WHEN I'LL KNOW THE FORMAT OF DATAS


                // let newStore = {};
                // let promises = [];
                //
                // this.storage.get(REST_STORAGE_KEY+'-'+key)
                // .then(store=>{
                //     // Parse store and copy all datas in newStore except the data to delete
                //     // Push each task in an array of promises
                //     for(let i=0; Object.keys(store).length > i; i++){
                //         let k = Object.keys(store[i]);
                //         let v = store[i][k];
                //         if(k!=data[0]){
                //             promises.push(newStore.push({k,v}));
                //         }
                //     }
                //     Promise.all(promises).then(()=>{
                //         this.storage.set(REST_STORAGE_KEY+'-'+key, newStore);
                //     }).catch(err=>{
                //         console.log("Error on delete local");
                //         reject();
                //     });
                // });
            };

            // public query(verb: string, route: string, ...param: Object, forceRefresh: boolean = false): Observable<any> {
            //     if(this.networkService.getCurrentNetworkStatus() == this.connectionStatus.Offline || !forceRefresh) {
            //         // Offline
            //         return from(this.getLocalData(verb+'_'+route));
            //     }else{
            //         // Online
            //         return from(this.getHeader(...param).then(h => {
            //             return this.http.request(verb, ""+REST_URL + route+"", h);
            //             .toPromise()
            //             .then(data=>{
            //                 this.setLocalData(verb+'_'+route, data);
            //                 return data;
            //             })
            //             .catch(e => {
            //                 console.log("Error request !"+ e);
            //                 // Store the request
            //                 this.offlineManagerService.storeRequest(route, verb, data)
            //             });
            //         }))
            //     }
            //     // if(verb == 'get' || verb == 'delete'){
            //     //     return this.getHeader(...param).then(h=>{
            //     //         return this.http.request(verb, ""+REST_URL + route+"", h)
            //     //         .toPromise()
            //     //         .then(data=>{
            //     //             return data;
            //     //         })
            //     //         .catch(e=>{ console.log("e e e e !"+ e); })
            //     //     })
            //     // }else{
            //     //     return this.getHeader(...param).then(h=>{
            //     //         return this.http[verb](`${REST_URL}${route}`, param[0] || {}, h)
            //     //         .pipe(
            //     //             tap( response => {
            //     //                 console.log("rest service response bis", response)
            //     //                 // this.auth.storeSession(response);
            //     //                 // return response;
            //     //             }),
            //     //             catchError((e: any, caught: Observable<any>) => {
            //     //                 return throwError( this.handleError(e, caught) )
            //     //             })
            //     //         );
            //     //     });
            //     // }
            // };

            // public get(route: string, param: any, forceRefresh: boolean = true) :Observable<any>{
            public get(route: string, param: any, forceRefresh: boolean = true): Promise<any>{
                // The forceRefresh variable permet d'économiser des requètes GET vers le server.
                // Il est de la responsabilité du dev de savoir si la valeur demandé est ou non en local.
                if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
                    console.log("CHECKER !")
                    // Offline (+ whatever forceRefresh) || Online + forceRefresh as false (as default)
                    // return from(this.getLocalData(route));
                    return this.getLocalData(route);
                }else{
                    // Online + forceRefresh as true
                    // return from(this.getHeader(param).then(headers => {
                    //     return this.http.get(REST_URL + route, headers)
                    //     .pipe(
                    //         map(data=>{
                    //             console.log("check in return data! ", data);
                    //         // }),
                    //         // catchError((err, caugh)=>{
                    //         //         console.log("Error request !"+ err);
                    //         //         console.log("Error request !"+ caugh);
                    //         })
                    //     )
                    return this.getHeader(param)
                    .then(headers => {
                        return this.http.get(REST_URL + route, headers).toPromise()
                    })
                    .then(data=>{
                        console.log("check in return data! ");
                        // this.setLocalData(route, data);
                        return data;
                    })
                    .catch(err => {
                        // console.log("Error request !"+ Object.keys(err));
                        console.log("Error request !"+ err);
                        // Call local because assimilé comme offline (+ whatever forceRefresh)
                        this.getLocalData(route);
                        // throw new Error(err);
                    });
                    // .catchError((err: any, caught: Observable<any>)=>{ // Property 'catchError' does not exist on type 'Promise<Object>'
                    //     console.log("Error request !"+ err);
                    //     // Call local because assimilé comme offline (+ whatever forceRefresh)
                    //     this.getLocalData(route);
                    //     return throwError( this.handleError(err, caught) )
                    // });
                }
            };
            public put(route: string, data: Object, forceRefresh: boolean) :Observable<any>{
                if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
                    // Offline
                    this.setLocalData(route, data);
                    return from(this.offlineManagerService.storeRequest(route, 'PUT', data));
                }else{
                    // Online
                    return from(this.getHeader().then(headers => {
                        return this.http.put(REST_URL + route, data, headers)
                        .toPromise()
                        .then(res=>{
                            if(res){
                                this.setLocalData(route, res);
                                return res;
                            }else{
                                this.setLocalData(route, data);
                                return;
                            }
                        })
                        .catch(err => {
                            console.log("Error request !"+ err);
                            // Call local because assimilé comme offline
                            this.setLocalData(route, data);
                            this.offlineManagerService.storeRequest(route, 'PUT', data);
                            throw new Error(err);
                        });
                    }));
                }
            };
            public post(route: string, data: Object, forceRefresh: boolean) :Observable<any>{
                if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
                    // Offline
                    this.setLocalData(route, data);
                    return from(this.offlineManagerService.storeRequest(route, 'POST', data));
                }else{
                    // Online
                    return from(this.getHeader().then(headers => {
                        return this.http.post(REST_URL + route, data, headers)
                        .toPromise()
                        .then(res=>{
                            if(res){
                                this.setLocalData(route, res);
                                return res;
                            }else{
                                this.setLocalData(route, data);
                                return;
                            }
                        })
                        .catch(err => {
                            console.log("Error request !"+ err);
                            // Call local because assimilé comme offline
                            this.setLocalData(route,data);
                            this.offlineManagerService.storeRequest(route, 'POST', data)
                            throw new Error(err);
                        });
                    }));
                }
            };
            public delete(route: string, data: Object, forceRefresh: boolean) :Observable<any>{
                if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
                    // Offline
                    this.deleteLocalData(route, data);
                    return from(this.offlineManagerService.storeRequest(route, 'DELETE', data));
                }else{
                    // Online
                    return from(this.getHeader().then(headers => {
                        return this.http.put(REST_URL + route, data, headers)
                        .toPromise()
                        .then(res=>{
                            if(res){
                                this.deleteLocalData(route, data);
                                this.setLocalData(route, res);
                                return res;
                            }else{
                                this.deleteLocalData(route, data);
                                return;
                            }
                        })
                        .catch(err => {
                            console.log("Error request !"+ err);
                            // Call local because assimilé comme offline
                            this.deleteLocalData(route, data);
                            this.offlineManagerService.storeRequest(route, 'DELETE', data)
                            throw new Error(err);
                        });
                    }));
                }
            };



            // private jwt(...param) {
            //     // create authorization header with jwt token
            //     this.afAuth.auth.currentUser.getIdToken(/*force refresh*/true).then(idToken=>{
            //         // console.log("userService jwt idToken", idToken)
            //         let headers = new HttpHeaders().set('x-access-token', idToken);
            //         if(param.length >= 1){
            //             for(let item in param[0]){
            //                 headers = headers.set(item, param[0][item]);
            //             }
            //         };
            //         return headers;
            //     })
            // };

        };
