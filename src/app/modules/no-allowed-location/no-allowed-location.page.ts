import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plugins, PermissionType } from '@capacitor/core';
import { ValidateService } from '../../core/services/validate/validate.service';
import { MenuController } from '@ionic/angular';
import { LanguagesService } from './../../core/services/language/languages.service';
const { Device, Storage, Geolocation } = Plugins;
@Component({
  selector: 'app-no-allowed-location',
  templateUrl: './no-allowed-location.page.html',
  styleUrls: ['./no-allowed-location.page.scss'],
})
export class NoAllowedLocationPage implements OnInit {
  device: any;
  showTip = false;
  coordsBar = false;
  watch: any;
  toast: any;
  deviceUser: any;
  lan: any;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private validateService: ValidateService,

    private menuController: MenuController,
    private languageService: LanguagesService,
  ) {
  }

  ngOnInit() {
    this.menuController.enable(false);
    this.getDevice();
    this.getLanguageStore();
  }

  // device
  async getDevice() {
    const info = await Device.getInfo();
    const device = info;
    if (device.platform === 'android' || device.platform === 'web') {
      this.showTip = true;
    }
  }

  // get Language
  async getLanguageStore() {
    Storage.get({ key: 'languageChoose' }).then(v => {
      this.lan = JSON.parse(v.value);
      if (!this.lan) {
        Storage.get({ key: 'language' }).then(val => {
          const id = val.value || 1;
          this.languageService.getKeyWords(id).subscribe(words => {
            this.lan = words.palabras;
          });
        });
      }
    }).catch((e) => {
      alert(JSON.stringify(e));
    });
  }

  async checkLocation() {
    this.coordsBar = true;
    this.deviceUser = false;
    Plugins.Permissions.query({ name: PermissionType.Geolocation }).then(res => {
      if (res.state === 'granted') {
        this.getCurrentPos();
      } else {
        this.coordsBar = false;
        this.deviceUser = true;
      }
    });
  }


  watchPosition() {
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      this.getCurrentPos();
      Plugins.Geolocation.clearWatch({ id: this.watch });
    });
  }


  // get location
  async getCurrentPos() {
    const coordinates = await Geolocation.getCurrentPosition();
    const obj = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    };
    Storage.set({
      key: 'location',
      value: JSON.stringify(obj)
    });
    this.validateUser(coordinates);
  }

  validateUser(coordinates) {
    Storage.get({ key: 'validate' }).then(v => {
      const obj = JSON.parse(v.value);
      if (v.value) {
        const validateObj = {
          id: obj.id,
          dispositivo: obj.dispositivo,
          latitud: coordinates.coords.latitude,
          longitud: coordinates.coords.longitude
        };
        this.validateService.validate(validateObj).subscribe(valid => {
          this.coordsBar = false;
          if (valid.valido) {
            this.router.navigate(['listado-servicios']);
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
}
