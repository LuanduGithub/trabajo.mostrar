import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { TripulanteServiciosGet, TripulanteServiciosPost } from '../model/tripulante';
@Injectable({
  providedIn: 'root'
})
export class TripulanteService {

  constructor(
    public http: HttpClient
  ) { }
  getTripulanteData(id, langId): Observable<TripulanteServiciosGet> {
    const url = `${environment.baseURLEmpleados}GetServicioTripulanteDetalle?id=${id}&idiomaId=${langId}`;
    return this.http.get<TripulanteServiciosGet>(url);
  }
  postFirma(obj): Observable<TripulanteServiciosPost> {
    const url = `${environment.baseURLEmpleados}ConfirmarTripulanteFirma`;
    return this.http.post<TripulanteServiciosPost>(url, obj);
  }
}
