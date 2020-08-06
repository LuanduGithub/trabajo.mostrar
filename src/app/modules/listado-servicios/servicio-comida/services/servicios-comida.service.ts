import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { ComidasServiceGet } from './../models/servicioComida';
@Injectable({
  providedIn: 'root'
})
export class ServiciosComidaService {

  constructor(
    public http: HttpClient
  ) { }
  getFoodData(id, langId, eId): Observable<ComidasServiceGet> {
    const url = `${environment.baseURLEmpleados}GetServicioComida?id=${id}&idiomaId=${langId}&eId=${eId}`;
    return this.http.get<ComidasServiceGet>(url);
  }
}
