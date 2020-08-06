import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAllowedLocationPage } from './no-allowed-location.page';

const routes: Routes = [
  {
    path: '',
    component: NoAllowedLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoAllowLoactionPageRoutingModule {}
