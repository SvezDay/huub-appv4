import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';


import * as firebase from 'firebase/app';
import {firebaseConfig} from './firebase-config';

import {AuthService} from './_core/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    moduleItems: Array<{ title: string, url: string, direct: string, icon: string, openTabs?: any }>;
    standardItems: Array<{ title: string, url: string, direct: string, icon: string, openTabs?: any }>;
    isExpanded = false;
    private isLogged: boolean;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private auth: AuthService,
        private router: Router
    ) {
        this.initializeApp();
        this.moduleItems = [];
        this.standardItems = [{title: 'Profile', url: 'user-profile', direct: 'forward', icon: 'profile'}
            // ,{title:'Settings', component:'SettingsPage'}
            // ,{title:'Help', component:'HelpPage'}
            // ,{title:'Demos', component:'DemosPage'}
            // ,{title:'Policies', component:'PoliciesPage'}
        ];
    }

    ngOnInit() {}

    initializeApp() {
        // Avant ngOnInit
        firebase.initializeApp(firebaseConfig);
        this.platform.ready().then(() => {
            // Après ngOnInit
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.router.navigateByUrl('/public/home');
        });
    }

}
