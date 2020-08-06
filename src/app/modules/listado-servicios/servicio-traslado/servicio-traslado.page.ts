import { Component, OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ServicioTrasladoService } from './services/servicio-traslado.service';
import { Transfer } from './models/servicioTraslado';
import { DataShareService } from './../../../core/services/dataShare/dataShare.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
const { Storage } = Plugins;
@Component({
  selector: 'app-servicio-traslado',
  templateUrl: './servicio-traslado.page.html',
  styleUrls: ['./servicio-traslado.page.scss'],
})
export class ServicioTrasladoPage implements OnInit {
  lan: any;
  transfer: Transfer;
  loading: HTMLIonLoadingElement;
  toast: any;
  sublist: boolean;


  constructor(
    private servicioTrasladoService: ServicioTrasladoService,
    private dataShareService: DataShareService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.sublist = false;
    this.getLanguageStore();
    this.getTransfer();
  }


  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }
  async getTransfer() {
    const id = this.dataShareService.getServiceId();
    if (id) {
      this.presentLoading();
      const {value} = await Storage.get({ key: 'language' });
      const eId = await Storage.get({ key: 'validate' });
      const idEmpleado = JSON.parse(eId.value);
      this.servicioTrasladoService.getTranferData(id, value, idEmpleado.id).subscribe(
        list => {
          const transfer = list.msg;
          if (transfer) {
            this.dismissLoading();
            this.transfer  = {
              id: transfer.id,
              fecha: new Date(transfer.fecha),
              hora: new Date(new Date().toDateString() + ' ' + transfer.hora) ,
              origen: transfer.origen,
              destino: transfer.destino,
              tiempoEstimado: transfer.tiempoEstimado,
              observacion: transfer.observacion,
              tipoTraslado: transfer.tipoTraslado,
              chofer: transfer.chofer,
              asistente: transfer.asistente,
              vehiculo: transfer.vehiculo,
              equipaje: transfer.equipaje,
              cantidadTripulantes: transfer.cantidadTripulantes,
              tripulantes: transfer.tripulantes,
              bitacoraNuevo : transfer.bitacoraNuevo,
              numeroVuelo: transfer.numeroVuelo,
              recorrido: transfer.recorrido,
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
    this.dataShareService.setServiceTypeId('TRASLADO' );
    this.router.navigate(['/listado-servicios/tripulante']);
  }
  gotoBitacora() {
    this.dataShareService.setServiceTypeId('TRASLADO' );
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
