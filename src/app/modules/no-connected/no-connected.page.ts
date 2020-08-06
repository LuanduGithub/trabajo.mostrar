import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-no-connected',
  templateUrl: './no-connected.page.html',
  styleUrls: ['./no-connected.page.scss'],
})
export class NoConnectedPage implements OnInit {
  lan: any;
  constructor(
  ) { }

  ngOnInit() {
    this.getLanguageStore();
  }

  // get Language
  async getLanguageStore() {
    const { value } = await Storage.get({ key: 'languageChoose' });
    this.lan = JSON.parse(value);
  }

}
