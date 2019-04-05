import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { AuthService } from './auth.service';

class MockRouter {
    navigate(path){}
}

// xdescribe('AuthService', () => {
//     let router;
//     let http: HttpClient;
//     let afAuth: AngularFireAuth;
//     let afs: AngularFirestore;
//     beforeEach(() => TestBed.configureTestingModule({}));
//
//     xit('should be created', () => {
//         // const service: AuthService = TestBed.get(AuthService);
//         // router = new MockRouter();
//         afAuth = new AngularFireAuth();
//         afs = new AngularFirestore();
//         router = new Router();
//         http = new HttpClient();
//         const service: AuthService = new AuthService(afAuth, afs, router, http);
//         expect(service).toBeTruthy();
//     });
// });
