import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { PopoverProfilePage } from '../popover-profile/popover-profile.page';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
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
