import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { ValidatePost } from '../../models/validate';
@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    public http: HttpClient
  ) { }
  validate(obj): Observable<ValidatePost> {
    const url = `${environment.baseURL}empleados/validar`;
    return this.http.post<ValidatePost>(url, obj);
  }
}
