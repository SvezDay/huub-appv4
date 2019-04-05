import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserProfilePage } from './user-profile.page';

// import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule
    , IonicModule
    , FormsModule
    , RouterModule.forChild([{ path: '', component: UserProfilePage }])
    // , AngularFirestoreModuleww
  ]
  ,declarations: [UserProfilePage]
})
export class UserProfilePageModule { }
