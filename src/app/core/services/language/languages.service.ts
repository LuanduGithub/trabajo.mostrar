import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { LanguagesGet, LanguageKeyWordsGet } from '../../models/language';
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(
    public http: HttpClient
  ) { }
  getLanguages(): Observable<LanguagesGet> {
    const url = `${environment.baseURL}idiomas/getidiomas`;
    return this.http.get<LanguagesGet>(url);
  }
  getKeyWords(id): Observable<LanguageKeyWordsGet> {
    const url = `${environment.baseURL}idiomas/getidiomaspalabrasempleados/${id}`;
    return this.http.get<LanguageKeyWordsGet>(url);
  }
}
