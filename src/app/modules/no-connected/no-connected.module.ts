import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoConnectedPageRoutingModule } from './no-connected-routing.module';

import { NoConnectedPage } from './no-connected.page';
import { ComponentsModule } from './../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoConnectedPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NoConnectedPage]
})
export class NoConnectedPageModule {}
