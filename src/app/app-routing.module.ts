import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'verificacion',
    loadChildren: () => import('./modules/verificacion/verificacion.module').then(m => m.VerificacionPageModule)
  },
  {
    path: 'listado-servicios',
    loadChildren: () => import('./modules/listado-servicios/listado-servicios.module').then(m => m.ListadoServiciosPageModule)
  },
  {
    path: 'no-connected',
    loadChildren: () => import('./modules/no-connected/no-connected.module').then(m => m.NoConnectedPageModule)
  },
  {
    path: 'no-allowed-location',
    loadChildren: () => import('./modules/no-allowed-location/no-allowed-location.module').then(m => m.NoAllowedLocationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
