import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoServiciosPage } from './listado-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoServiciosPage
  },
  {
    path: 'servicio-traslado',
    loadChildren: () => import('./servicio-traslado/servicio-traslado.module').then( m => m.ServicioTrasladoPageModule)
  },
  {
    path: 'servicio-alojamiento',
    loadChildren: () => import('./servicio-alojamiento/servicio-alojamiento.module').then( m => m.ServicioAlojamientoPageModule)
  },
  {
    path: 'servicio-comida',
    loadChildren: () => import('./servicio-comida/servicio-comida.module').then( m => m.ServicioComidaPageModule)
  },
  {
    path: 'tripulante',
    loadChildren: () => import('./tripulante/tripulante.module').then( m => m.TripulantePageModule)
  },
  {
    path: 'bitacora',
    loadChildren: () => import('./bitacora/bitacora.module').then( m => m.BitacoraPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoServiciosPageRoutingModule {}
