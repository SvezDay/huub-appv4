import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
    public resetPasswordForm: FormGroup;
    constructor(
        private auth: AuthService,
        private alertCtrl: AlertController,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.resetPasswordForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
    }

    ngOnInit() {}
    resetPassword(resetPasswordForm: FormGroup): void {
        if (!resetPasswordForm.valid) {
            console.log(
                'Form is not valid yet, current value:', resetPasswordForm.value
            );
        } else {
            const email: string = resetPasswordForm.value.email;
            this.auth.forgotPassword(email).then(
                async () => {
                    const alert = await this.alertCtrl.create({
                        message: 'Check your email for a password reset link',
                        buttons: [
                            {
                                text: 'Ok',
                                role: 'cancel',
                                handler: () => {
                                    this.router.navigateByUrl('login');
                                },
                            },
                        ],
                    });
                    await alert.present();
                },
                async error => {
                    const errorAlert = await this.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: 'Ok', role: 'cancel' }],
                    });
                    await errorAlert.present();
                }
            );
        }
    }

}
