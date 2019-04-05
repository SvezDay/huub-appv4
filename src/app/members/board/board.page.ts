import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { PopoverProfilePage } from '../popover-profile/popover-profile.page';
import { AuthService } from '../../_core/auth.service';
// import { ToolbarPage} from '../toolbar/toolbar.page';
import { RestService } from '../../_core/rest.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss', '../../app.component.scss']
  // ,providers: [PopoverProfilePageModule]
})
export class BoardPage implements OnInit {

  constructor(
      private authService: AuthService
      , private popoverCtrl: PopoverController
      , private restService: RestService
      , private loadingController: LoadingController
      , private alertController: AlertController
  ) { }

  ngOnInit() {
      console.log('check board')
      // this.restService.get('/user/getProfile', {}).then( async (res) => {
      //     console.log("check res", res);
      //     // const alert = await this.alertController.create({
      //     //     message: "Hello world !",
      //     //     buttons: [{ text: 'Ok', role: 'cancel' }],
      //     // });
      //     // await alert.present();
      // })
  }
  isLogged(): Promise<boolean>{
      return this.authService.isLoggedIn();
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
