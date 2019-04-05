import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-profile',
  templateUrl: './popover-profile.page.html',
  styleUrls: ['./popover-profile.page.scss'],
})
export class PopoverProfilePage implements OnInit {

  constructor(private pop: PopoverController, private router: Router) { }

  ngOnInit() {
  }
  closePopover(route: string = null){
      console.log("route", route)
      this.pop.dismiss();
      if(route!=null)
        this.router.navigate([`/members/${route}`])
  }

}
