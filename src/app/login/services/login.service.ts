import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { LoginPostResp } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public http: HttpClient
  ) { }
  postLogin(obj): Observable<LoginPostResp> {
    const url = `${environment.baseURLEmpleados}login`;
    return this.http.post<LoginPostResp>(url, obj);
  }
}
