import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

import { AuthService } from '../../_core/auth.service';
import { RestService } from "../../_core/rest.service";

import { from } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators'

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
    ){
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
        ]
      });
    }

    ngOnInit(){ }

    signup(){
        console.log("check")
        this.router.navigate(['/public/sign-up']);
    }

    //async loginUser(loginForm: FormGroup): Promise<void> {
    async loginUser(): Promise<void> {
      if (!this.loginForm.valid) {
        console.log('Form is not valid yet, current value:', this.loginForm.value);
      } else {
        /*this.loading = await this.loadingCtrl.create();
        await this.loading.present();*/
          const toast = await this.toastController.create({
              message: 'Click to Close'
          });
          toast.present();

        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.auth.signin(email, password)
        .subscribe(
            ()=>{
                toast.dismiss().then(() => {
                    this.router.navigate(['/members/board']);
                });
            },
            err => {
                toast.dismiss().then(async () => {
                    const alert = await this.alertCtrl.create({
                        message: err.message,
                        buttons: [{ text: 'Ok', role: 'cancel' }],
                    });
                    await alert.present();
                })
            })
        // this.auth.signin(email, password).pipe(
        //     switchMap(() => {
        //         this.loading.dismiss().then(() => {
        //             this.router.navigate(['/members/board']);
        //         });
        //     }),
        //     catchError(error => {
        //         this.loading.dismiss().then(async () => {
        //             const alert = await this.alertCtrl.create({
        //                 message: error.message,
        //                 buttons: [{ text: 'Ok', role: 'cancel' }],
        //               });
        //           await alert.present();
        //         })
        //     })
        // );
      }
    }


}
