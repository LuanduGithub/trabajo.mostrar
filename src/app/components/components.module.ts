import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlockerComponent } from './blocker/blocker.component';
import { PopoverComponent } from './popover/popover.component';
import { LoadingDosComponent } from './loading-dos/loading-dos.component';
import { MapComponent } from './map/map.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        BlockerComponent,
        PopoverComponent,
        LoadingDosComponent,
        MapComponent,

    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        BlockerComponent,
        PopoverComponent,
        LoadingDosComponent,
        MapComponent,

    ]
})
export class ComponentsModule {
}
