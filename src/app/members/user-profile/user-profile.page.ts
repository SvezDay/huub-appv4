import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_core/auth.service';
import { MenuController, PopoverController } from '@ionic/angular';
import { PopoverProfilePage } from '../popover-profile/popover-profile.page';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class UserProfilePage implements OnInit {

  constructor(public auth: AuthService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  doSomething() {
    // console.log(this.auth.user);
  }
  async popoverProfile(ev: Event){
      console.log('check popoverProfile() ev: ', ev)
      const popover = await this.popoverCtrl.create({
          component: PopoverProfilePage,
          event: ev
      });
      popover.present();
  }

}
