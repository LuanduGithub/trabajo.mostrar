import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripulantePageRoutingModule } from './tripulante-routing.module';

import { TripulantePage } from './tripulante.page';
import { ComponentsModule } from './../../../components/components.module';
import { SignaturePadModule } from 'ngx-signaturepad';
import { Clipboard } from '@ionic-native/clipboard/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripulantePageRoutingModule,
    ComponentsModule,
    SignaturePadModule,
  ],
  declarations: [TripulantePage],
  providers: [
    Clipboard,
  ],
})
export class TripulantePageModule { }
