import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoAllowLoactionPageRoutingModule } from './no-allowed-location-routing.module';

import { NoAllowedLocationPage } from './no-allowed-location.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoAllowLoactionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NoAllowedLocationPage]
})
export class NoAllowedLocationPageModule {}
