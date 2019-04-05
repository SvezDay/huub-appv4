import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { RestService } from './rest.service';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/database';

// import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , HttpClientModule
    // , AngularFireModule.initializeApp(environment.firebase)
    // , AngularFireAuthModule
    // , AngularFirestoreModule.enablePersistence()
    // , AngularFireDatabaseModule
  ],
  providers:[HttpClient, AuthService, UserService, RestService /*, AngularFireAuth*/]
})
export class CoreModule { }
