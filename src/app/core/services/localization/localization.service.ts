import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  localization: any;
  constructor() { }
  setLocalization(localization) {
    this.localization = localization;
  }
  getLocalization(): any {
    return this.localization;
  }
}
