import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataShareService } from './../../../core/services/dataShare/dataShare.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BitacoraService } from './services/bitacora.service';
import { Bitacora } from './models/bitacora';
import { AlertController } from '@ionic/angular';
const { Storage } = Plugins;
@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})
export class BitacoraPage implements OnInit {
  lan: any;
  loading: HTMLIonLoadingElement;
  toast: any;
  bitacorasType: { type: string; }[];
  bitacora: Bitacora[];
  bitacoraTypeChoose: Bitacora[];
  message: any;
  bitacoraTypeSelect: any;
  user: string;
  @ViewChild('messageBox', { static: false }) messageBox: ElementRef;
  infobox: boolean;
  infoIndex: number;
  sendMessageLoading = false;
  constructor(
    private dataShareService: DataShareService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    private bitacoraService: BitacoraService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.bitacorasType = undefined;
    this.bitacoraTypeChoose = undefined;
    this.infoIndex = undefined;
    this.infobox = undefined;

    this.getLanguageStore();
    this.getBitacorasType();

  }

  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }

  async getBitacorasType(bitacoraTypeChoose = null) {
    const idServicio = this.dataShareService.getServiceId();
    const eId = await Storage.get({ key: 'validate' });
    const idEmpleado = JSON.parse(eId.value);
    this.user = idEmpleado.user.nombre;
    this.bitacoraService.getBitacoraData(parseInt(idServicio, 10), idEmpleado.id).subscribe(res => {
      this.bitacora = res.bitacoras;
      this.bitacorasType = res.bitacoras.map(bType => {
        return {
          type: bType.nombre,
          typeId: bType.id,
          typeNoRed: bType.noLeidos,
          typeTotal: bType.mensajesTotal
        };
      });
      if (bitacoraTypeChoose) {
        this.chooseType(bitacoraTypeChoose);
      }

    });
  }


  async checkRead() {
    const idServicio = this.dataShareService.getServiceId();
    const eId = await Storage.get({ key: 'validate' });
    const IdEmpleado = JSON.parse(eId.value);
    this.bitacoraService.checkRead(parseInt(idServicio, 10), IdEmpleado.id, this.bitacoraTypeChoose[0].id).subscribe(res => {
      this.getBitacorasType();
    });
  }

  async chooseType(e) {
    if (e.detail) {
      if (e.detail.value !== '' && e.detail.value !== undefined) {
        this.bitacoraTypeChoose = this.bitacora.filter(res => res.id.toString() === e.detail.value);
        this.checkRead();
      } else {
        return;
      }
    } else {
      this.bitacoraTypeChoose = this.bitacora.filter(res => res.id === e);
      this.checkRead();
      this.bitacoraTypeSelect = undefined;
    }
    this.scrollTo();
  }

  async sendMessage() {
    this.sendMessageLoading = true;
    const idServicio = this.dataShareService.getServiceId();
    const eId = await Storage.get({ key: 'validate' });
    const IdEmpleado = JSON.parse(eId.value);
    const obj = {
      mensaje: this.message,
      empleadoId: IdEmpleado.id,
      servicioId: parseInt(idServicio, 10),
      bitacoraId: this.bitacoraTypeChoose[0].id
    };
    this.bitacoraService.postBitacoraMensaje(obj).subscribe(res => {
      this.sendMessageLoading = false;
      this.message = '';
      this.getBitacorasType(this.bitacoraTypeChoose[0].id);
    });
  }

  async scrollTo() {
    setTimeout(() => {
      this.messageBox.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
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

  showInfo(i) {
    this.infobox = true;
    this.infoIndex = i;
  }

}
