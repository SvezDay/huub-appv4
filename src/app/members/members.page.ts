import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_core/auth.service';
import { RestService } from '../_core/rest.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss', '../app.component.scss'],
})
export class MembersPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private restService: RestService) { }

  ngOnInit() {
      console.log("check members page");
      // this.restService.get('/user/getProfile', {}).then( async (res) => {
      //     console.log("check res", res);
      //     // const alert = await this.alertController.create({
      //     //     message: "Hello world !",
      //     //     buttons: [{ text: 'Ok', role: 'cancel' }],
      //     // });
      //     // await alert.present();
      // })
  }
  logout(){
      this.authService.logout().then(()=>{
          this.router.navigate(['/public/home']);
      });
  }

}
