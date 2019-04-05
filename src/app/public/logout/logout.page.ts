import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../_core/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
      console.log("checking logout!")
      this.auth.logout().then(()=>{
          this.router.navigate(['/public/home']);
      });
  }

}
