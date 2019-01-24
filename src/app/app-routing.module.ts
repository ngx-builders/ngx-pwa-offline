import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineComponent } from './offline/offline.component';
import { UnavailableComponent } from './unavailable/unavailable.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'offline', component: OfflineComponent },
  { path: 'unavailable', component: UnavailableComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
