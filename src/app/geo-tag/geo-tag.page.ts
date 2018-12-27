import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

// declare const H: any;

@Component({
  selector: 'app-geotag',
  templateUrl: 'geo-tag.page.html',
  styleUrls: ['geo-tag.page.scss']
})

export class GeoTagPage implements OnInit {

  platform: any;

  lat: any;
  lng: any;

  map: any;

  constructor() {}

  ngOnInit() {

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });

    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });

    // let Latlng = L.latLng(19.07, 72.87);

    this.map = L.map('mapid').setView([19.07, 72.87], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // L.marker(Latlng).addTo(this.map);
  }

  addMarker() {

    let Latlng = L.latLng(19.07, 72.87);

    L.marker(Latlng).addTo(this.map);

  }
}
