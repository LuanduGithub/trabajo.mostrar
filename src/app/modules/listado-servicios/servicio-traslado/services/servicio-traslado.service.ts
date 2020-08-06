import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { TransferServiciosGet } from './../models/servicioTraslado';

@Injectable({
  providedIn: 'root'
})
export class ServicioTrasladoService {
  constructor(
    public http: HttpClient
  ) { }
  getTranferData(id, langId, eId): Observable<TransferServiciosGet> {
    const url = `${environment.baseURLEmpleados}GetServicioTraslado?id=${id}&idiomaId=${langId}&eId=${eId}`;
    return this.http.get<TransferServiciosGet>(url);
  }

}
