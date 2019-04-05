import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { PopoverProfilePage } from '../popover-profile/popover-profile.page';
import { AuthService } from '../../_core/auth.service';
import { RestService } from '../../_core/rest.service';
import { Page } from '../../_interfaces/box';

@Component({
    selector: 'app-box',
    templateUrl: './box.page.html',
    styleUrls: ['./box.page.scss'],
})
export class BoxPage implements OnInit {
    page: Page;
    @ViewChild('ion-menu') menu: MenuController
    // constructor(private menu: MenuController, private auth: AuthService, private api: ApiService) { }
    constructor(private auth: AuthService, private rest: RestService, private popoverCtrl: PopoverController) { }

    ngOnInit() {
        this.getPage();
    }
    openCustom() {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
    }
    // logout(){
    //     console.log("fn logout")
    //     this.auth.logout();
    // }
    private getPage(){
        console.log('check in getPage')
        let params = {};
        this.rest.get("/rest/box/getPage",{}, false)
        .then(data=>{
            console.log("data from boxpage: ", data);
        })
    }
    async popoverProfile(ev: Event){
        console.log("check popoverProfile() ev: ", ev)
        const popover = await this.popoverCtrl.create({
            component: PopoverProfilePage,
            event:ev
        });
        popover.present();
    }

}
