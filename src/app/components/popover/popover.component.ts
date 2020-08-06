import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguagesService } from '../../core/services/language/languages.service';
import { Language } from './../../core/models/language';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  languages: Language[];
  constructor(
    private languageService: LanguagesService,
    private popovercontroller: PopoverController
  ) { }

  ngOnInit() {
    this.getLanguage();
  }
  // load Languages
  getLanguage() {
    this.languageService.getLanguages().subscribe(lan => {
      this.languages = lan.idiomas;
    });
  }


  sendId(idioma) {
    this.popovercontroller.dismiss({
     idioma
    });
  }
}
