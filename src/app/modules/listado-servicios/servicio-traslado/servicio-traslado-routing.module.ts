import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioTrasladoPage } from './servicio-traslado.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioTrasladoPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioTrasladoPageRoutingModule {}
