import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { DataShareService } from './../../../core/services/dataShare/dataShare.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioAlojamientoService } from './services/servicio-alojamiento.service';
import { Accommodation } from './models/servicioAlojamiento';
const { Storage } = Plugins;

@Component({
  selector: 'app-servicio-alojamiento',
  templateUrl: './servicio-alojamiento.page.html',
  styleUrls: ['./servicio-alojamiento.page.scss'],
})
export class ServicioAlojamientoPage implements OnInit {
  lan: any;
  loading: HTMLIonLoadingElement;
  toast: any;
  sublist: boolean;
  accomodation: Accommodation;
  constructor(
    private servicioAlojamientoService: ServicioAlojamientoService,
    private dataShareService: DataShareService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getLanguageStore();
    this.getAccomodation();
  }
  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }

  async getAccomodation() {
    const id = this.dataShareService.getServiceId();
    if (id) {
      this.presentLoading();
      const { value } = await Storage.get({ key: 'language' });
      const eId = await Storage.get({ key: 'validate' });
      const idEmpleado = JSON.parse(eId.value);
      this.servicioAlojamientoService.getAccomodationData(id, value, idEmpleado.id).subscribe(
        list => {
          const accomodation = list.msg;
          if (accomodation) {
            this.dismissLoading();
            this.accomodation = {
              id: accomodation.id,
              fechaDesde: new Date(accomodation.fechaDesde),
              horaDesde: new Date(new Date().toDateString() + ' ' + accomodation.horaDesde),
              fechaHasta: new Date(accomodation.fechaHasta),
              horaHasta: new Date(new Date().toDateString() + ' ' + accomodation.horaHasta),
              checkInAnticipado: accomodation.checkInAnticipado,
              checkOutPosterior: accomodation.checkOutPosterior,
              tipoCama: accomodation.tipoCama,
              observacion: accomodation.observacion,
              incluyeComidas: accomodation.incluyeComidas,
              cantidadComidas: accomodation.cantidadComidas,
              incluyeExtras: accomodation.incluyeExtras,
              hotel: accomodation.hotel,
              estado: accomodation.estado,
              cantidadTripulantes: accomodation.cantidadTripulantes,
              tripulantes: accomodation.tripulantes,
              bitacoraNuevo: accomodation.bitacoraNuevo
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
    this.dataShareService.setServiceTypeId('ALOJAMIENTO' );
    this.router.navigate(['/listado-servicios/tripulante']);
  }
  gotoBitacora() {
    this.dataShareService.setServiceTypeId('ALOJAMIENTO' );
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
