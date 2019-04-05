import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { User } from '../_interfaces/user';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router){  }

    canActivate(currentRoute: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.auth.isLoggedIn();
    }
}
