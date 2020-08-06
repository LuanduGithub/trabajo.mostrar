import { Component, OnInit } from '@angular/core';
import { VerificacionGet } from './models/verificacion';
import { VerificacionService } from './services/verificacion.service';
import { LoginPostResp } from './../../login/models/login';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
const { Storage } = Plugins;

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
})

export class VerificacionPage implements OnInit {

  user: LoginPostResp;
  verifData: VerificacionGet;
  loading: HTMLIonLoadingElement;
  words: any;
  lan: any;

  passwordForm: FormGroup;

  constructor(
    private verificacionService: VerificacionService,
    public loadingController: LoadingController,
    private router: Router,
    public toastController: ToastController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.verifData = undefined;
    this.getObject();
    this.passwordForm = this.formBuilder.group({
      passwordControl: ['', Validators.required]
    });
  }
  ionViewWillEnter() {
    this.getLanguageStore();
  }

  // get Language
  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }

  async getObject() {
    const { value } = await Storage.get({ key: 'validate' });
    const user = JSON.parse(value);
    this.user = user.user;
    this.getVerData(this.user.empleadoId);
  }
  getVerData(id) {
    this.verificacionService.getVerificacionData(id).subscribe(verif => {
      this.verifData = verif;
    });
  }

  postVerf(id, password) {
    this.presentLoading();
    const obj = {
      id,
      password
    };
    this.verificacionService.postVerificacion(obj).subscribe(verif => {
      this.loading.dismiss();
      if (verif.success) {
        this.router.navigate(['listado-servicios']);
      } else {
        this.presentToastWithOptions();
      }
    });
  }

  // loading

  async presentLoading(message = '') {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = await this.loadingController.create({
      message,
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


  // toast

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.lan.verificacion.TextoError,
      position: 'bottom',
      color: 'secondary',
      translucent: false,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
