import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, AlertController, ToastController} from '@ionic/angular';
import {AuthService} from '../_core/auth.service';
import {RestService} from '../_core/rest.service';

@Component({
    selector: 'app-public',
    templateUrl: './public.page.html',
    styleUrls: ['./public.page.scss'],
})
export class PublicPage implements OnInit {
    // public loading: HTMLIonLoadingElement;

    constructor(
        private router: Router
        , private authService: AuthService
        , private loadingController: LoadingController
        , private toastController: ToastController
        , private alertController: AlertController
        , private restService: RestService
    ) {
    }

    ngOnInit() {
        /*this.authService.isLoggedIn().then(res => {
            console.log('Dans public page ts, ng init authservice return');
            if (res) {
                this.restService.get('/user/getProfile', {})
                .then((result: any) => {
                    console.log('check res', result);
                    // Store profile in cache front
                    this.router.navigateByUrl('/members/board');

                }).catch((err: any) => {
                    // Ajouter une gestion de l'erreur
                });
            } else {
                // Ajouter une gestion de l'erreur
            }
        });*/
    }

}
