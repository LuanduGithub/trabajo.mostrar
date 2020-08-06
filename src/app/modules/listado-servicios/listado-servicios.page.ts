import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { ListadoServiciosService } from './services/listado-servicios.service';
import { DataShareService } from './../../core/services/dataShare/dataShare.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
const { Storage, Modals } = Plugins;
@Component({
  selector: 'app-listado-servicios',
  templateUrl: './listado-servicios.page.html',
  styleUrls: ['./listado-servicios.page.scss'],
})
export class ListadoServiciosPage implements OnInit {
  lan: any;
  services: Array<any>;
  loading: HTMLIonLoadingElement;
  toast: any;
  langId: any;
  token: string;
  constructor(
    private menuController: MenuController,
    private listadoServiciosService: ListadoServiciosService,
    private dataShareService: DataShareService,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
    this.menuController.enable(true);
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getLanguageStore();
    this.getServicios();
    this.getToken();
  }


  getToken() {
    Storage.get({ key: 'token' }).then(v => {
      this.token = v.value;
      if (this.token === null) {
        Modals.alert({
          title: this.lan.login.notificaciones,
          message: 'Error en notificación cierre sesión, habilite y acceda de nuevo por favor '
        });
      }
    });
  }

  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }

  async getServicios() {
    this.services = [];
    this.presentLoading();
    const lang = await Storage.get({ key: 'language' });
    const user = await Storage.get({ key: 'validate' });
    const userId = JSON.parse(user.value);
    this.listadoServiciosService.getListadoServiciosData(userId.id, lang.value).subscribe(
      list => {
        this.dismissLoading();
        const services = list.servicios;
        console.log(list.servicios);
        if (services) {
          this.services = services.map(data => {
            const obj = {
              id: data.id,
              fecha: new Date(data.fecha),
              hora: new Date(new Date().toDateString() + ' ' + data.hora),
              cantidadTripulantes: data.cantidadTripulantes,
              bitacoraNuevo: data.bitacoraNuevo,
              tipo: {
                nombre: data.tipo.nombre,
                id: data.tipo.id
              },
              traslados: data.traslados ? {
                origen: data.traslados.origen,
                destino: data.traslados.destino
              } : {},
              alojamientos: data.alojamientos ? {
                hotel: data.alojamientos.hotel,
              } : {},
              comidas: data.comidas ? {
                lugar: data.comidas.lugar,
              } : {}
            };

            return obj;
          });

        } else {
          const header = this.lan.error.TituloMensajeError;
          const message = list.msg;
          this.presentToastWithOptions(header, message);
        }

      }
    );
  }

  gotoTransfer(service) {
    this.dataShareService.setServiceId(service.id);
    this.router.navigate(['listado-servicios/servicio-traslado']);
  }
  gotoAccomodation(service) {
    this.dataShareService.setServiceId(service.id);
    this.router.navigate(['listado-servicios/servicio-alojamiento']);
  }
  gotoFood(service) {
    this.dataShareService.setServiceId(service.id);
    this.router.navigate(['listado-servicios/servicio-comida']);
  }
  gotoBitacora(service) {
    this.dataShareService.setServiceId(service.id);
    this.dataShareService.setServiceTypeId(service.tipo.id);
    this.router.navigate(['listado-servicios/bitacora']);
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
