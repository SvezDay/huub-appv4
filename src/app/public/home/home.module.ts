import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
// import { PopoverProfilePageModule } from '../popover-profile/popover-profile.module';

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicModule
    , CommonModule
    , FormsModule
    , RouterModule.forChild([{ path: '', component: HomePage }])
    // , PopoverProfilePageModule
  ]
})
export class HomePageModule { }
