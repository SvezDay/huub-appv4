import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../_core/auth.service';
import { RestService } from '../../_core/rest.service';
// import { PopoverProfilePage } from '../popover-profile/popover-profile.page';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

    constructor(
        private storage: Storage
        , private menuController: MenuController
        , private authService: AuthService
        // , private pop: PopoverController
        // , private router: Router
        , private restService: RestService
    ) {}

    ngOnInit() {
        // Comme indiqué dans app routing, redirect vers board si logged
        // this.authService.isLoggedIn().then(res=>{
        //     console.log("home page isLoggedin(): ", res)
        //     if(res){
        //         this.router.navigateByUrl('/members/board');
        //     }
        // })
    }
    openCustom() {
        this.menuController.enable(true, 'custom');
        this.menuController.open('custom');
    }
    closeCustom(){
        this.menuController.close('custom');
    }
    setData() {
        this.storage.set('data', 'goodby');
    }
    getData() {
        this.storage.get('data').then(data=>{
            console.log(data)
        })
    }
    test(){
        this.restService.get('/test', {}).then(res=>{
            console.log("Launching test : ", res);
        })
    }
    // async popoverProfile(ev: Event){
    //     const popover = await this.pop.create({
    //         component: PopoverProfilePage,
    //         event:ev
    //     })
    //     popover.present();
    // }
    logout(){
        this.authService.logout().then(()=>{ this.closeCustom(); })
    }

}
