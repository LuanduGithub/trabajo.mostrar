import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioComidaPage } from './servicio-comida.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioComidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioComidaPageRoutingModule {}
