import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import * as firebase from 'firebase/app';
import {firebaseConfig} from './firebase-config';

import {AuthService} from './_core/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    moduleItems: Array<{title:string, url:string, direct:string, icon:string, openTabs?:any}>;
    standardItems: Array<{title:string, url:string, direct:string, icon:string, openTabs?:any}>;
    isExpanded = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private auth: AuthService,
        private router: Router
    ) {
        this.initializeApp();
        this.moduleItems = [];
        this.standardItems = [{title:'Profile', url:'user-profile', direct:'forward', icon:'profile'}
            // ,{title:'Settings', component:'SettingsPage'}
            // ,{title:'Help', component:'HelpPage'}
            // ,{title:'Demos', component:'DemosPage'}
            // ,{title:'Policies', component:'PoliciesPage'}
        ];
    }
    ngOnInit(){
        this.auth.isLoggedIn();
    }

    initializeApp() {
        firebase.initializeApp(firebaseConfig);
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // this.auth.authState.subscribe(state=>{
            //     console.log("app.component init state: ", state);
            //     if(state){
            //         this.router.navigate(['members', 'board']);
            //     }else{
            //         this.router.navigate(['public', 'home']);
            //     }
            // })
            this.router.navigate(['public', 'home']);
        });
    }

}
