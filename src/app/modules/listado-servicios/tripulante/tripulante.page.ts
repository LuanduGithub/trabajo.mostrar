import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataShareService } from './../../../core/services/dataShare/dataShare.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { TripulanteService } from './services/tripulante.service';
import { Router } from '@angular/router';
import { Tripulante, Detalles, TripulanteServiciosGet, Ubicacion } from './model/tripulante';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
const { Storage, Geolocation } = Plugins;

import { SignaturePad } from 'ngx-signaturepad/signature-pad';

@Component({
  selector: 'app-tripulante',
  templateUrl: './tripulante.page.html',
  styleUrls: ['./tripulante.page.scss'],
})
export class TripulantePage implements OnInit {
  lan: any;
  loading: HTMLIonLoadingElement;
  toast: any;
  tripulante: Tripulante;
  detallesColor: {
    color,
    detalles: Array<Detalles>
  };
  ubicacion: Ubicacion;
  datosCity: any;

  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;
  @ViewChild('profileImg', { static: false }) profileImg: ElementRef;
  signaturePadOptions = {
    minWidth: .5,
    maxWidth: 2,
    canvasWidth: 350,
    canvasHeight: 150,
    backgroundColor: '#ffffff',
  };
  signed: boolean;
  sublist: boolean;
  zoomIn: string;
  signatureBtnIsDisabled = true;

  constructor(
    private dataShareService: DataShareService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private tripulanteService: TripulanteService,
    private router: Router,
    private nativeGeocoder: NativeGeocoder,
    private clipboard: Clipboard
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.tripulante = undefined;
    this.detallesColor = undefined;
    this.ubicacion = undefined;
    this.sublist = false;
    this.getLanguageStore();
    this.getTripulante();
  }

  zoomInProfileImg() {
    this.zoomIn = (this.profileImg.nativeElement as HTMLImageElement).height + 'px';
  }
  zoomOutProfileImg() {
    this.zoomIn = undefined;
  }

  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }

  async getTripulante() {
    const id = this.dataShareService.getTripulanteId();
    if (id) {
      this.presentLoading();
      const { value } = await Storage.get({ key: 'language' });
      this.tripulanteService.getTripulanteData(id, value).subscribe(data => {
        this.dismissLoading();
        console.log(data.datos);
        this.tripulante = data.datos;
        let color = 0;
        data.detalles.filter(d => {
          if (color <= d.color) {
            return color = d.color;
          }
        });
        this.signed = !this.tripulante.firmaRegistrada;
        this.detallesColor = {
          color,
          detalles: data.detalles
        };
        this.ubicacion = data.ubicacion;
        this.getCity(this.ubicacion);
      });
    }
  }


  // toast
  async presentToast(message) {
    this.toast = await this.toastController.create({
      message,
      position: 'bottom',
      color: 'secondary',
      translucent: false,
      duration: 2000,
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


  // Get Location
  async getCity(coordinates) {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    if (coordinates) {
      const lat = coordinates.latitud;
      const lng = coordinates.longitud;
      this.nativeGeocoder.reverseGeocode(lat, lng, options)
        .then((result: NativeGeocoderResult[]) => {
          const datosCity = result[0];
          this.datosCity =
            `${datosCity.administrativeArea} - ${datosCity.subAdministrativeArea}, ${datosCity.countryCode}`;
        })
        .catch((error: any) => console.log(error));
    } else {
      this.datosCity =
        this.lan.general.sininformacion;
    }

  }

  // back action

  backbtn() {
    const tipoId = this.dataShareService.getServiceTypeId();
    if (tipoId === '1' || tipoId === '2' || tipoId === '4') {
      this.router.navigate(['listado-servicios']);
    } else {
      switch (tipoId) {
        case ('TRASLADO'): {
          this.router.navigate(['listado-servicios/servicio-traslado']);
          break;
        }
        case 'ALOJAMIENTO': {
          this.router.navigate(['listado-servicios/servicio-alojamiento']);
          break;
        }
        case 'COMIDAS': {
          this.router.navigate(['listado-servicios/servicio-comida']);
          break;
        }
      }
    }

  }

  // signature pad
  async drawComplete() {
    const imgBase = this.signaturePad.toDataURL();
    const coordinates = await Geolocation.getCurrentPosition();
    const obj = {
      id: this.dataShareService.getTripulanteId(),
      firma: imgBase,
      latitud: coordinates.coords.latitude,
      longitud: coordinates.coords.longitude
    };
    this.tripulanteService.postFirma(obj).subscribe(() => {
      this.presentToast(this.lan.tripulantedetalles.firmaguardada);
      this.getTripulante();
    });

  }



  // get location
  getCurrentPos() {
    Geolocation.getCurrentPosition().then(coordinates => {
      const obj = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
      Storage.set({
        key: 'location',
        value: JSON.stringify(obj)
      });
    }).catch(() => {
      this.router.navigate(['no-allowed-location']);
    });

  }





  drawClear() {
    this.signaturePad.clear();
  }
  drawBegin() {
    this.signatureBtnIsDisabled = false;
  }
  scrollTo(element: HTMLElement) {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);

  }

  copyToClipboard(data) {
    this.clipboard.copy(data).then(res => {
      this.presentToast(this.lan.tripulantedetalles.copiado);
    });
  }

}

