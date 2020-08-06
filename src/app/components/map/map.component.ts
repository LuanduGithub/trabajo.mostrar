import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, PermissionType } from '@capacitor/core';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit {
  map: any;
  markers: any[] = [];
  timestamp: any;
  mapsLoaded = false;
  @Input() longitude: any;
  @Input() latitude: any;
  constructor(
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.initMap();
    this.addMarker(this.latitude, this.longitude);
  }

  ionViewDidLoad() {
    this.initMap();
    this.addMarker(this.latitude, this.longitude);
  }

  private initMap(): Promise<any> {

    return new Promise((resolve, reject) => {


      const latLng = new google.maps.LatLng(this.latitude, this.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 15,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false
      };

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      resolve(true);



    });

  }
  addMarker(lat: number, lng: number): void {

    const latLng = new google.maps.LatLng(lat, lng);

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);

  }
}
