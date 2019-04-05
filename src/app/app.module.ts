import { NgModule /*, CUSTOM_ELEMENTS_SCHEMA*/ } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { MaterialModule } from './material.module';
import { CoreModule } from './_core/core.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './_core/auth.guard';



const routes: Routes = [
    { path: 'public', loadChildren: './public/public.module#PublicPageModule'},
    { path: 'members', loadChildren: './members/members.module#MembersPageModule', canActivate:[AuthGuard]},

    /* Lors de la construction de app.component, lorsque la lib platform de ionic est prète,
     l'application renvoi directement et irremediablement vers "public/home".*/
    /* In the home constructor, if logged redirect to board */
    { path: '', loadChildren: './public/public.module#PublicPageModule'},
    { path: '**', loadChildren: './public/public.module#PublicPageModule' },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule
    , MaterialModule
    , FormsModule
    , HttpClientModule
    , IonicModule.forRoot()
    , IonicStorageModule.forRoot({
        name: 'umpwa_clt',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
    , RouterModule.forRoot(routes)
    , BrowserAnimationsModule
    , CoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
  // ,schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
