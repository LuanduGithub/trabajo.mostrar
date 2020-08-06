import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { AccommodationServiceGet } from '../models/servicioAlojamiento';

@Injectable({
  providedIn: 'root'
})
export class ServicioAlojamientoService {

  constructor(
    public http: HttpClient
  ) { }
  getAccomodationData(id, langId, eId): Observable<AccommodationServiceGet> {
    const url = `${environment.baseURLEmpleados}GetServicioAlojamiento?id=${id}&idiomaId=${langId}&eId=${eId}`;
    return this.http.get<AccommodationServiceGet>(url);
  }
}
