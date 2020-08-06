import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { ListadoServiciosGet } from '../models/listado-servicios.model';

@Injectable({
  providedIn: 'root'
})
export class ListadoServiciosService {
  constructor(
    public http: HttpClient
  ) { }
  getListadoServiciosData(id, langId): Observable<ListadoServiciosGet> {
    const url = `${environment.baseURLEmpleados}GetServiciosVigentes?id=${id}&idiomaId=${langId}`;
    return this.http.get<ListadoServiciosGet>(url);
  }

}
