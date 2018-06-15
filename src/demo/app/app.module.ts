import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Network } from '../../lib';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot([]) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
