import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { VerificacionGet, VerificacionPost } from '../models/verificacion';
@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  constructor(
    public http: HttpClient
  ) { }
  getVerificacionData(id): Observable<VerificacionGet> {
    const url = `${environment.baseURLEmpleados}getdatosverificacion/${id}`;
    return this.http.get<VerificacionGet>(url);
  }
  postVerificacion(obj): Observable<VerificacionPost> {
    const url = `${environment.baseURLEmpleados}confirmarverificacion`;
    return this.http.post<VerificacionPost>(url, obj);
  }
}
