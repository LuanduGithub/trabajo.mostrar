import { Injectable } from '@angular/core';
import { Language } from '../../models/language';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  castellano: any;
  english: any;
  lan: any;
  constructor() { }

  setCastellano(lan) {
    this.castellano = lan;
  }

  getCastellano(): any {
    return this.castellano;
  }
  setEnglish(lan) {
    this.english = lan;
  }

  getEnglish(): any {
    return this.english;
  }

  setlan(lan) {
    this.lan = lan;
  }

  getlan(): any {
    return this.lan;
  }



}
