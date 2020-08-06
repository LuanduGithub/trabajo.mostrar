import { Injectable } from '@angular/core';
import { Language } from '../../models/language';

@Injectable({
    providedIn: 'root'
})
export class DataShareService {
    serviceId: any;
    tripulanteId: any;
    tipoId: any;
    tipo: any;
    constructor() { }

    setServiceId(id) {
        this.serviceId = id;
    }

    getServiceId(): any {
        return this.serviceId;
    }

    setTripulanteId(id) {
        this.tripulanteId = id;
    }

    getTripulanteId(): any {
        return this.tripulanteId;
    }

    setServiceTypeId(serviceTipo) {
        this.tipo = serviceTipo;
    }
    getServiceTypeId(): any {
        return this.tipo;
    }


    setTipoId(id) {
        this.tipoId = id;
    }
    getTipoId() {
        return this.tipoId;
    }

}
