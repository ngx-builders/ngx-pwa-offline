import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OfflineModule } from '@ngx-pwa/offline';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, OfflineModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
