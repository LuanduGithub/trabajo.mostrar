import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { TranslateService } from './../core/services/translate/translate.service';
import { MenuController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Plugins, CallbackID, PushNotificationToken } from '@capacitor/core';
import { PopoverComponent } from './../components/popover/popover.component';
import { LanguagesService } from './../core/services/language/languages.service';


const { Storage, Geolocation, Device, PushNotifications } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;
  loading: HTMLIonLoadingElement;
  toast: any;
  info: any;
  datosCity: any;
  lan: any;
  token: string;
  positionWatchId: string;
  position: any;
  watchId: CallbackID;
  coordinates: any;
  idiomaId: number;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private languageService: LanguagesService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private nativeGeocoder: NativeGeocoder,
    private menuController: MenuController,
    public popoverController: PopoverController,
    private translateService: TranslateService
  ) { }

  ionViewWillEnter() {
    this.getCurrentPos();
    this.getLanguageStore();
    this.menuController.enable(false);
  }
  ngOnInit() {
    this.getToken();
    this.getDevice();
    this.loginFormGroup = new FormGroup({
      usuarioLogin: new FormControl('', [Validators.required]),
      passwordLogin: new FormControl('', [Validators.required])
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
      this.coordinates = coordinates.coords;
      this.getCity(coordinates.coords);
    }).catch(() => {
      this.router.navigate(['no-allowed-location']);
    });

  }



  // get Language
  getLanguage(id) {
    this.languageService.getKeyWords(id).subscribe(words => {
      this.lan = words.palabras;
      Storage.set({
        key: 'languageChoose',
        value: JSON.stringify(words.palabras)
      });
    });
  }
  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'language' });
    console.log(value);
    if (value) {
      this.getLanguage(value);
    } else {
      this.getLanguage('1');
      Storage.set({
        key: 'language',
        value: '1'
      });
    }
  }


  async getToken() {
    const { value } = await Storage.get({ key: 'token' });
    if (!value) {
      PushNotifications.requestPermission().then(result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
      // this.presentLoading();
      PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          Storage.set({
            key: 'token',
            value: token.value
          });
          this.token = token.value;
          this.dismissLoading();
        }
      );
      PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
        }
      );
    } else {
      this.token = value;
    }
  }

  async onSubmitLogin(form) {
    const obj = {
      username: form.value.usuarioLogin,
      password: form.value.passwordLogin,
      dispositivo: this.info.uuid,
      latitud: this.coordinates.latitude,
      longitud: this.coordinates.longitude,
      token: this.token,
      idiomaId: this.idiomaId || 1
    };
    if (obj.latitud) {
      // this.presentLoading();
      this.loginService.postLogin(obj).subscribe(login => {
        this.dismissLoading();
        if (login.success) {
          if (this.toast) { this.dismissToast(); }
          this.setObject(login);
          this.setPermissionsGranted('granted');
          if (login.verificado) {
            // this.router.navigate(['verificacion']);
            this.router.navigate(['listado-servicios']);
          } else {
            this.router.navigate(['verificacion']);
          }
        } else {
          const header = this.lan.error.TituloMensajeError;
          const message = login.msg;
          this.presentToastWithOptions(header, message);
          this.loginFormGroup.controls.usuarioLogin.setValue('');
          this.loginFormGroup.controls.passwordLogin.setValue('');
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.dismissLoading();
      this.router.navigate(['no-allowed-location']);
    }
  }

  // storage
  async setObject(user) {
    const obj = {
      user,
      id: user.empleadoId,
      dispositivo: this.info.uuid,
    };
    await Storage.set({
      key: 'validate',
      value: JSON.stringify(obj)
    });
  }

  async setPermissionsGranted(permission) {
    await Storage.set({
      key: 'permission',
      value: permission
    });
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
    const lat = coordinates.latitude;
    const lng = coordinates.longitude;
    this.nativeGeocoder.reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderResult[]) => {
        this.dismissLoading();
        this.datosCity = result[0];
      })
      .catch((error: any) => console.log(error));
  }


  // device
  async getDevice() {
    const info = await Device.getInfo();
    this.info = info;
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

  // pop over menu three dots
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    await popover.onDidDismiss().then(data => {
      if (data.data) {
        const lanId = data.data.idioma.toString();
        Storage.set({
          key: 'language',
          value: lanId
        });
        this.getLanguage(lanId);
      }
    });
  }
}
