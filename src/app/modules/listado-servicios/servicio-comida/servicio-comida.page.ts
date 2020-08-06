import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { DataShareService } from './../../../core/services/dataShare/dataShare.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Comida } from './models/servicioComida';
import { ServiciosComidaService } from './services/servicios-comida.service';
const { Storage } = Plugins;
@Component({
  selector: 'app-servicio-comida',
  templateUrl: './servicio-comida.page.html',
  styleUrls: ['./servicio-comida.page.scss'],
})
export class ServicioComidaPage implements OnInit {
  lan: any;
  loading: HTMLIonLoadingElement;
  toast: any;
  sublist: boolean;
  comida: Comida;
  constructor(
    private dataShareService: DataShareService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    private serviciosComidaService: ServiciosComidaService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getLanguageStore();
    this.getFood();
  }
  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }


  async getFood() {
    const id = this.dataShareService.getServiceId();
    if (id) {
      this.presentLoading();
      const { value } = await Storage.get({ key: 'language' });
      const eId = await Storage.get({ key: 'validate' });
      const idEmpleado = JSON.parse(eId.value);
      this.serviciosComidaService.getFoodData(id, value, idEmpleado.id).subscribe(
        list => {
          const comidaList = list.msg;
          if (comidaList) {
            this.dismissLoading();
            this.comida = {
              id: comidaList.id,
              fecha: new Date(comidaList.fecha),
              hora: new Date(new Date().toDateString() + ' ' + comidaList.hora),
              comida: comidaList.comida,
              tipoComida: comidaList.tipoComida,
              tipoContrato: comidaList.tipoContrato,
              observaciones: comidaList.observaciones,
              lugar: comidaList.lugar,
              estado: comidaList.estado,
              cantidadTripulantes: comidaList.cantidadTripulantes,
              tripulantes: comidaList.tripulantes,
              bitacoraNuevo: comidaList.bitacoraNuevo
            };
          } else {
            const header = this.lan.error.TituloMensajeError;
            const message = list.msg;
            this.presentToastWithOptions(header, message);
          }
        }
      );
    } else {
      this.dismissLoading();
      this.router.navigate(['listado-servicios']);
    }

  }


  // back action

  backbtn() {
    Storage.remove({ key: 'idServicio' });
    this.router.navigate(['listado-servicios']);
  }

  gotoTripulante(tripulante) {
    this.dataShareService.setTripulanteId(tripulante.id);
    this.dataShareService.setServiceTypeId('COMIDAS' );
    this.router.navigate(['/listado-servicios/tripulante']);
  }
  gotoBitacora() {
    this.dataShareService.setServiceTypeId('COMIDAS' );
    this.router.navigate(['/listado-servicios/bitacora']);
  }


  // toast
  async presentToastWithOptions(header, message, geo = false) {
    this.toast = await this.toastController.create({
      header,
      message,
      position: 'bottom',
      color: 'secondary',
      translucent: false,
      buttons: [
        {
          text: this.lan.error.BotonMensajeError,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }


  // loading
  async presentLoading(message = '') {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = await this.loadingController.create({
      message,
      animated: true,
      backdropDismiss: false,
      showBackdrop: true,
      translucent: true,
      cssClass: 'custom-class custom-loading text-capitalize',
      spinner: 'dots'
    });
    await this.loading.present();
  }
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

}
