import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitacoraPageRoutingModule } from './bitacora-routing.module';

import { BitacoraPage } from './bitacora.page';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitacoraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BitacoraPage]
})
export class BitacoraPageModule {}
