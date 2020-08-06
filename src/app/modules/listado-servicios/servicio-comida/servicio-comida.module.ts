import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioComidaPageRoutingModule } from './servicio-comida-routing.module';

import { ServicioComidaPage } from './servicio-comida.page';

import { ComponentsModule } from './../../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioComidaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ServicioComidaPage]
})
export class ServicioComidaPageModule {}
