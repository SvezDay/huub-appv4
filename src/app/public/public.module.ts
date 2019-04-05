import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicPage } from './public.page';

const routes: Routes = [
    { path: '', component: PublicPage, children: [
        { path: 'home', loadChildren: './home/home.module#HomePageModule' }
        ,{ path: 'login', loadChildren: './login/login.module#LoginPageModule' }
        ,{ path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' }
        ,{ path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' }
        ,{ path: 'verify-email', loadChildren: './verify-email/verify-email.module#VerifyEmailPageModule' }
        ,{ path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
  , declarations: [PublicPage]
})
export class PublicPageModule {}
