import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { Bitacoras, CheckRead, Enviar } from '../models/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(
    public http: HttpClient
  ) { }

  getBitacoraData(id, eId): Observable<Bitacoras> {
    const url = `${environment.baseURL}bitacoras/Get/?id=${id}&eId=${eId}`;
    return this.http.get<Bitacoras>(url);
  }
  checkRead(sId, eId, bId): Observable<CheckRead> {
    const url = `${environment.baseURL}bitacoras/MarcarLeidos/?sId=${sId}&eId=${eId}&bId=${bId}`;
    return this.http.get<CheckRead>(url);
  }
  postBitacoraMensaje(obj): Observable<Enviar> {
    const url = `${environment.baseURL}bitacoras/Enviar`;
    return this.http.post<Enviar>(url, obj);
  }
}
