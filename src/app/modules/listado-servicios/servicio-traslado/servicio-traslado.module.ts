import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioTrasladoPageRoutingModule } from './servicio-traslado-routing.module';

import { ServicioTrasladoPage } from './servicio-traslado.page';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ServicioTrasladoPageRoutingModule
  ],
  declarations: [ServicioTrasladoPage]
})
export class ServicioTrasladoPageModule {}
