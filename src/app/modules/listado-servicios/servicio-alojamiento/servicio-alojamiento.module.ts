import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioAlojamientoPageRoutingModule } from './servicio-alojamiento-routing.module';

import { ServicioAlojamientoPage } from './servicio-alojamiento.page';
import { ComponentsModule } from './../../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioAlojamientoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ServicioAlojamientoPage]
})
export class ServicioAlojamientoPageModule {}
