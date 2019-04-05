import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import 'hammer';

if (environment.production) {
  console.log("!!!!!!!!!!!!!!!! PRODUCTION MODE !!!!!!!!!!!!!!!!!!!!!!!")
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
