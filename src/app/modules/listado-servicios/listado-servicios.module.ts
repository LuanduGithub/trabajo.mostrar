import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoServiciosPageRoutingModule } from './listado-servicios-routing.module';

import { ListadoServiciosPage } from './listado-servicios.page';
import { ComponentsModule } from './../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoServiciosPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ListadoServiciosPage]
})
export class ListadoServiciosPageModule {}
