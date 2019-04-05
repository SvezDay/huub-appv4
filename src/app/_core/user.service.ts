import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, retry, tap } from 'rxjs/operators';

import { User } from '../_interfaces/user';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
// import {IntercomService} from './intercom.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private domain: any;
  constructor(private http: HttpClient, private auth: AuthService, private afs: AngularFirestore) { }

  private handleError(error: any){
    console.log('error', error);
  }

  public query(verb, route, ...param) {
    if(verb == 'get' || verb == 'delete'){
      return this.http[verb](`${environment.apiUrl}/api${route}`, {headers: this.jwt(...param)})
      .pipe(
        tap( response => {
          // console.log("api service response", response)
          // this.auth.storeSession(response);
          return response;
        }),
        catchError((e: any) => throwError(this.handleError(e)) )
        // catchError(this.handleError(e)) })
      );
    }else{
      return this.http[verb](`${environment.apiUrl}/api${route}`, param[0] || {}, {headers: this.jwt()})
      .pipe(
        tap( response => {
          // console.log("api service response bis", response)
          // this.auth.storeSession(response);
          return response;
        }),
        catchError((e: any) => throwError(this.handleError(e)) )
      );
    }
  };

  private jwt(...param) {
      // create authorization header with jwt token
      // this.afs.auth.currentUser.getIdToken(/*force refresh*/true).then(idToken=>{
      //   console.log("userService jwt idToken", idToken)
      //   let headers = new HttpHeaders().set('x-access-token', idToken);
      //   if(param.length >= 1){
      //     for(let item in param[0]){
      //       headers = headers.set(item, param[0][item]);
      //     }
      //   }
      // })
  };

}
