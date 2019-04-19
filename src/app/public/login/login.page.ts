import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {LoadingController, AlertController, ToastController} from '@ionic/angular';

import {AuthService} from '../../_core/auth.service';
import {RestService} from '../../_core/rest.service';

import {from} from 'rxjs';
import {switchMap, catchError, map} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;

    // public loading: HTMLIonLoadingElement;
    constructor(
        public loadingCtrl: LoadingController,
        private toastController: ToastController,
        public alertCtrl: AlertController,
        private auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private reset: RestService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
            ]
        });
    }

    ngOnInit() {
    }

    signup() {
        console.log('check');
        this.router.navigate(['/public/sign-up']);
    }

    // async loginUser(loginForm: FormGroup): Promise<void> {
    async signinWithCreds(): Promise<void> {
        if (!this.loginForm.valid) {
            const toast = await this.toastController.create({
                message: 'Wrong email or password !',
                duration: 2000
            });
            toast.present();
        } else {
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;

            this.auth.signin(email, password);
        }
    }

    signinWithGoogle(): void {
        this.auth.signinWithGoogle().then(() => {
            this.router.navigate(['/members/board']);
        });
    }

    signinWithFacebook(): void {
        this.auth.signinWithFacebook().then(() => {
            this.router.navigate(['/members/board']);
        });
    }

    signinWithTwitter(): void {
        this.auth.signinWithTwitter().then(() => {
            this.router.navigate(['/members/board']);
        });
    }


}
