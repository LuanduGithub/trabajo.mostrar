import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripulantePage } from './tripulante.page';

const routes: Routes = [
  {
    path: '',
    component: TripulantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripulantePageRoutingModule {}
