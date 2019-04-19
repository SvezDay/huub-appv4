import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {LoadingController, AlertController, ToastController} from '@ionic/angular';

// import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {Observable, of, throwError, BehaviorSubject, from, ObservableInput} from 'rxjs';
import {switchMap, catchError, retry} from 'rxjs/operators';

import {User} from '../_interfaces/user';
// import { environment } from '../../environments/environment';

import {RestService} from './rest.service';

// import {switchTap} from '@angular/router/src/operators/switch_tap';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loading: HTMLIonLoadingElement;
    private toast: HTMLIonToastElement;
    private authState = new BehaviorSubject(false);
    // user: Observable<User>;
    firestore;

    // isLogged: boolean = false; // Problème, il semble que l'appel d'un variable d'un service retourne une boocle infinie.

    constructor(
        private router: Router
        , private http: HttpClient
        , private rest: RestService
        , private loadingController: LoadingController
        , private toastController: ToastController
        , private alertController: AlertController
    ) {

    }

    /*
    forgotPassword
    handleError
    logout
    signup
    // signin
    signin
    signinWithGoogle
    signinWithFacebook
    signinWithTwitter
    authLogin
    // getProfile
    getLocalProfile
    setLocalProfile
    getRestProfile
    // isLoggedIn
    // isLoggedInOrRedirectHome
    isAuthenticated
    */


    static forgotPassword(email: string): Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    private handleError(err: any): any {

    }

    logout(): Promise<void> {
        // this.isLogged = false;
        this.authState.next(false);
        return firebase.auth().signOut();
    }

    signup(first: string, last: string, email: string, password: string): Promise<any> {
        // Création du profile du côté Firebase auth
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((newUserCredential: firebase.auth.UserCredential) => {
                newUserCredential.user.getIdToken().then((idToken: string) => {
                    // this.getProfile(idToken);
                    this.getRestProfile(idToken);
                });
            })
            .catch((erreur: any) => {
                // Ajouter une gestion d'erreur
            });
    }

    /*
  signin(email: string, password: string): Observable<any> {
      return from(firebase.auth().signInWithEmailAndPassword(email, password)).pipe(
          switchMap(UserCredential => {
              return this.getProfile();
          })
      );
  }
  */
    async signin(email: string, password: string): Promise<void> {
        const loadingElement = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'crescent'
        });
        loadingElement.present();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential: any) => {
                // Ajouter la fonction firestore
                // Ajouter la fonction rest get profile
                loadingElement.dismiss().then(() => {
                    this.router.navigate(['/members/board']);
                });
            })
            .catch((err: any) => {
                loadingElement.dismiss().then(async () => {
                    const toast = await this.toastController.create({
                        message: 'Connection failed',
                        duration: 2000
                    });
                    toast.present();
                });
                console.log('signin connection failed : ', err);
            });
    }

    signinWithGoogle(): Promise<void> {
        return this.authLogin(new firebase.auth.GoogleAuthProvider());
    }

    signinWithFacebook(): Promise<void> {
        return this.authLogin(new firebase.auth.FacebookAuthProvider());
    }

    signinWithTwitter(): Promise<void> {
        return this.authLogin(new firebase.auth.TwitterAuthProvider());
    }


    private authLogin(provider): Promise<any> {
        // return firebase.auth().signInWithRedirect(provider) // Void method
        console.log('authService.authLogin()');
        return firebase.auth().signInWithPopup(provider)
            .then((result) => {
                this.authState.next(true);
                // console.log('result ==========================================: ', result);
                // standard firebase auth object
                const providerId = result.credential.providerId;
                const signInMethod = result.credential.signInMethod;
                const profile = result.additionalUserInfo.profile;
                const username = result.additionalUserInfo.username;
                // Usefull
                const emailVerified = result.user.emailVerified;
                const isNew = result.additionalUserInfo.isNewUser;

                const isAnonymous = result.user.isAnonymous;
                const metadata = result.user.metadata;
                const phoneNumber = result.user.phoneNumber;
                const providerData = result.user.providerData;
                const photoURL = result.user.photoURL;

                console.log('authService.authLogin() result: ', result);
                return result.user.getIdToken().then((idToken: any) => {
                    console.log('authService.authLogin() idToken: ', idToken);
                    return this.getRestProfile(idToken);
                }).catch((reason: any) => {
                    console.log('error on getIdToken suite au firebase auth with provider: ', reason);
                    return;
                });


                // this.isLogged = true;
                // this.ngZone.run(() => {
                //     this.router.navigate(['dashboard']);
                // })
                // this.SetUserData(result.user);

            }).catch((error) => {
                // Ajouter un message d'erreur
                // Erreur de connection
                // Erreur de suspension de compte
                // Erreur Email déjà utilisé
                console.log(error);
            });
    }

    /*getProfile(token: string): Observable<any> {
        /!*return from(this.rest.get('/rest/getProfile', {}, false))
            .pipe(
                switchMap((profile: any): ObservableInput<any>{
                    firebase.firestore().doc(`userProfile`)
                        .set({email: profile.email});
                }),
                catchError(this.handleError)
            );
        *!/
        return from(this.rest.get('/rest/getProfile', {}, false)
            .then((profile: any) => {
                firebase.firestore().doc(`userProfile`)
                    .set({email: profile.email});
            })
            .catch(this.handleError)
        );
    }*/
    getLocalProfile(): any {
        return firebase.firestore().doc('userProfile');
    }

    setLocalProfile(profile) {
        firebase.firestore().doc(`userProfile`)
            .set({email: profile.email});
    }

    getRestProfile(token: string): Observable<any> {
        console.log('authService.getRestProfile()');
        return from(this.rest.get('/rest/getProfile', {}, false)
            .then((profile: any) => {
                console.log('CHECK callback de getRestProfile');
                this.setLocalProfile(profile);
            })
            .catch(this.handleError)
        );
    }

    isLoggedIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // console.log("check in isLoggedIn 1")
            firebase.auth().onAuthStateChanged((user: firebase.User) => {
                // console.log('check in isLoggedIn 2', !!user);
                // console.log('check in isLoggedIn 3', user);
                this.authState.next(!!user);
                if (!!user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /*isLoggedInOrRedirectHome() {
        this.isLoggedIn().then(res => {
            if (!res) {
                this.router.navigate(['/public/login']);
            }
        });
    }*/

    isAuthenticated() {
        console.log('authService | isAuthenticate() :', this.authState.value);
        return this.authState.value;
    }

    // ngInit(){
    //     this.firestore = this.afs.firestore.settings({timestampsInSnapshots: true});
    // }
    // private handleError(error){
    //     return throwError('Something bad happened; please try again later.');
    // }
    //
    // public isLoggedIn(){
    //     return firebase.auth().onAuthStateChanged(user => {
    //         // console.log("auth service isLogged user:", user);
    //         if(user==null){
    //             return false;
    //         }else{
    //             return true;
    //         }
    //     });
    // }
    //
    // private initUser(){
    //     // // Get Auth Data, then get firestore user document || null
    //     this.user = this.afAuth.authState
    //     .pipe(switchMap(user=>{
    //         if(user) {
    //             console.log("authService initUser user", user.uid)
    //             return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    //         }else{
    //             console.log("authService initUser null");
    //             return of(null);
    //         }
    //     }))
    //
    //     this.user.subscribe(value=>{
    //         console.log( "initUser value:", value)
    //         this.getCurrentUser();
    //     })
    // }
    //
    // googleLogin(){
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     // Ceci afin de restreindre le scope ne pas créer de nouvel utilisateur
    //     // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //     return this.oAuthLogin(provider);
    // }
    // emailLogin(){
    //     const provider = new firebase.auth.EmailAuthProvider();
    //     return this.oAuthLogin(provider);
    // }
    // private oAuthLogin(provider) {
    //     return this.afAuth.auth.signInWithPopup(provider)
    //     .then(credential => {
    //         console.log("oAuthLogin credential", credential.user)
    //         // this.updateUserData(credential.user);
    //         // this.getCurrentUser();
    //
    //     })
    // }
    // private updateUserData(user){
    //     // Sets user data to firewtore on login
    //     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    //     const data: User = {
    //         uid: user.uid
    //         ,email: user.email
    //         ,photoURL: user.photoURL
    //         ,displayName: user.displayName
    //     };
    //     return userRef.set(data);
    // }
    // private getCurrentUser() {
    //     this.getToken().then(token=> {
    //         // console.log("=====================================================")
    //         // let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('x-access-token', token);
    //         let headers = new HttpHeaders({
    //             'Content-Type': 'application/json; charset=utf-8',
    //             'Authorization': JSON.stringify(token) });
    //         this.http.get(`${this.restUrl}/getCurrentUser`, {headers:headers})
    //         .subscribe(data =>{
    //             console.log('data from registration', data);
    //         }, (err: HttpErrorResponse) => {
    //             if (err.error instanceof Error) {
    //                 console.log('Client-side error occured.');
    //             } else {
    //                 console.log('Server-side error occured.', err);
    //             }
    //         })
    //     })
    // }
    // private getToken(){
    //     // Pour s'assurer que le user est signin
    //     return new Promise((resolve, reject)=>{
    //         firebase.auth().onAuthStateChanged(user => {
    //             if(user){
    //                 user.getIdToken(/*force refresh*/true).then(token=>{
    //                     resolve(token);
    //                 })
    //             }else{
    //                 reject();
    //             }
    //         })
    //     })
    // }
    // // private jwt(...param) {
    // //     // create authorization header with jwt token
    // //     this.afAuth.auth.currentUser.getIdToken(/*force refresh*/true).then(idToken=>{
    // //         // console.log("userService jwt idToken", idToken)
    // //         let headers = new HttpHeaders().set('x-access-token', idToken);
    // //         if(param.length >= 1){
    // //             for(let item in param[0]){
    // //                 headers = headers.set(item, param[0][item]);
    // //             }
    // //         };
    // //         return headers;
    // //     })
    // // };
    //
    // logout() {
    //     this.afAuth.auth.signOut();
    // }


}
