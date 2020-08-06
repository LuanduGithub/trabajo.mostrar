import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificacionPageRoutingModule } from './verificacion-routing.module';

import { VerificacionPage } from './verificacion.page';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerificacionPageRoutingModule,
    ComponentsModule,

  ],
  declarations: [VerificacionPage]
})
export class VerificacionPageModule {}
