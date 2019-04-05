import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../_core/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    public signupForm: FormGroup;
    public loading: any;
    constructor(
        private auth: AuthService,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
        private alertCtrl: AlertController,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.signupForm = this.formBuilder.group({
            first: [
                '',
                Validators.compose([Validators.maxLength(15), Validators.minLength(2), Validators.required])
            ],
            last: [
                '',
                Validators.compose([Validators.maxLength(20), Validators.minLength(2), Validators.required])
            ],
            email: [
                '',
                Validators.compose([Validators.required, Validators.email])
            ],
            password: [
                '',
                Validators.compose([Validators.maxLength(50), Validators.minLength(6), Validators.required])
            ]
        });
    }

    ngOnInit() {
    }

    // async signupUser(signupForm: FormGroup): Promise<void> {
    async signupUser(): Promise<void> {
        console.log("check 1")
        const toast = await this.toastController.create({
            message: 'Click to Close'
        });
        toast.present();
        if (!this.signupForm.valid) {
            console.log("check Error")
            toast.dismiss();
            console.log('Need to complete the form, current value: ', this.signupForm.value);
        } else {
            console.log("check 2")
            const first: string = this.signupForm.value.first;
            const last: string = this.signupForm.value.last;
            const email: string = this.signupForm.value.email;
            const password: string = this.signupForm.value.password;

            this.auth.signup(first, last, email, password)
            .then(() => {
                    console.log("check 3")
                    toast.dismiss().then(() => {
                        setTimeout(()=>{
                            this.router.navigate(['/public/home']);
                        }, 4000)
                    });
                },
                error => {
                    toast.dismiss().then(async () => {
                        const alert = await this.alertCtrl.create({
                            message: error.message,
                            buttons: [{ text: 'Ok', role: 'cancel' }],
                        });
                        await alert.present();
                    });
                }
            );
        }
    }

}
