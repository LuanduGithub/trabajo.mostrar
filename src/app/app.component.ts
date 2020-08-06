import { Component, OnInit } from '@angular/core';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, PermissionType } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValidateService } from './core/services/validate/validate.service';
import { LoadingController } from '@ionic/angular';
import { LanguagesService } from './core/services/language/languages.service';
import { DataShareService } from './core/services/dataShare/dataShare.service';
import { environment } from './../environments/environment';


const { Storage, SplashScreen, Network, PushNotifications, Modals, Geolocation } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  words: any;
  lan: any;
  loading: HTMLIonLoadingElement;
  watch: any;
  public selectedIndex = 0;
  appPages = [
    {
      title: '',
      url: '/listado-servicios',
      icon: 'paper-plane'
    }
  ];
  status: any;
  positionWatchId: string;
  position: any;
  notification = false;
  version: string;
  versionDate: string;
  constructor(
    private router: Router,
    private platform: Platform,
    private validateService: ValidateService,
    public loadingController: LoadingController,
    private languageService: LanguagesService,
    private dataShareService: DataShareService,

  ) {
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('pushNotificationReceived' + notification);
        const click = new Audio('assets/sounds/click.mp3');
        click.play();
        const confirmRet = Modals.confirm({
          title: notification.title,
          message: notification.body,
        }).then(() => {
          /* alert(JSON.stringify(notification)); */
          this.getCurrentPos('notificacion');
          this.notification = true;
          this.dataShareService.setServiceTypeId(notification.data.tipoId);
          this.dataShareService.setServiceId(notification.data.servicioId);
        });


      }
    );
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        this.getCurrentPos('notificacion');
        this.notification = true;
        /* alert(JSON.stringify(notification)); */
        this.dataShareService.setServiceTypeId(notification.notification.data.tipoId);
        this.dataShareService.setServiceId(notification.notification.data.servicioId);
      }
    );
    Network.getStatus().then(status => {
      if (status.connected) {
        this.initializeApp();
      } else {
        this.router.navigate(['no-connected']);
      }
    });

    Network.addListener('networkStatusChange', (status) => {
      if (!status.connected) {
        this.router.navigate(['no-connected']);
      } else if (this.router.url === '/no-connected' && status.connected) {
        Plugins.Permissions.query({ name: PermissionType.Geolocation }).then(res => {
          if (res.state === 'granted') {
            this.router.navigate(['']);
          } else {
            this.router.navigate(['no-allowed-location']);
          }
        });
      }
    });


    this.platform.ready().then((res) => {
      this.platform.resume.subscribe(() => {
        this.getCurrentPos();
      });
    });


  }
  ngOnInit() {
    this.version = environment.version;
    this.versionDate = environment.versionDate;
    this.userLogged();
  }
  onMenuOpen() {
    this.getLanguageStore();
  }

  // get Language
  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }


  userLogged() {
    this.getCurrentPos();
  }

  async clear() {
    await Storage.remove({ key: 'permission' });
    await Storage.remove({ key: 'validate' }).then(userRemove => {
      this.router.navigate(['login']);
    });
    await Storage.remove({ key: 'coordinates' });
    await Storage.remove({ key: 'location' });
    await Storage.remove({ key: 'user' });
    await Storage.remove({ key: 'token' });
  }
  async initializeApp() {
    try {
      await SplashScreen.hide();
      this.status = await Network.getStatus();
    } catch (err) {
      console.log('es un browser web', err);
    }
  }


  // get location
  getCurrentPos(tipo = '') {
    Geolocation.getCurrentPosition().then(coordinates => {
      const obj = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
      Storage.set({
        key: 'location',
        value: JSON.stringify(obj)
      });
      this.validateUser(coordinates, tipo);
    }).catch(() => {
      this.router.navigate(['no-allowed-location']);
    });

  }

  validateUser(coordinates, goto) {
    Storage.get({ key: 'validate' }).then(v => {
      const obj = JSON.parse(v.value);
      if (v.value) {
        this.presentLoading();
        const validateObj = {
          id: obj.id,
          dispositivo: obj.dispositivo,
          latitud: coordinates.coords.latitude,
          longitud: coordinates.coords.longitude
        };
        this.validateService.validate(validateObj).subscribe(valid => {
          this.dismissLoadingSolo();
          if (valid.valido) {
            switch (goto) {
              case ('notificacion'): {
                this.router.navigate(['/listado-servicios/bitacora']);
                break;
              }
              default: {
                if (this.notification) {
                  this.router.navigate(['/listado-servicios/bitacora']);
                  this.notification = false;
                } else {
                  this.router.navigate(['listado-servicios']);
                }
                break;
              }
            }

          } else {
            this.router.navigate(['login']);
          }
        });
      } else {
        this.router.navigate(['login']);
      }
    }).catch(() => {
    });
  }




  async presentLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = await this.loadingController.create({
      animated: true,
      backdropDismiss: false,
      showBackdrop: true,
      translucent: true,
      cssClass: 'custom-class custom-loading text-capitalize',
      spinner: 'dots'
    });
    await this.loading.present();
  }
  async dismissLoadingSolo() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
  async dismissLoading(goto) {
    if (this.loading) {
      await this.loading.dismiss().then(d => {
        switch (goto) {
          case true: {
            this.router.navigate(['listado-servicios']);
            break;
          }
          case false: {
            this.router.navigate(['login']);
            break;
          }
        }
      });
    }
  }


}
