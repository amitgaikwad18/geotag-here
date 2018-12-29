import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GeoCoordsService } from '../services/geocoords.service';
import { Geocoords } from '../model/geocoords.model';

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

  constructor(private geolocation: Geolocation, public geocoordsService: GeoCoordsService) {}

  ngOnInit() {

    let coordinates = this.geocoordsService.getCurrentCoordinates();
    console.log('Coordinates from Geotag >>> ' + coordinates.latitude);
    console.log('Coordinates from Geotag >>> ' + coordinates.longitude);

    this.map = L.map('mapid').setView([coordinates.latitude, coordinates.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([coordinates.latitude, coordinates.longitude])
    .bindPopup('Latitude: ' + coordinates.latitude + ', Longitude: ' + coordinates.longitude)
    .addTo(this.map);

  }

  recenter() {

    let coordinates = this.geocoordsService.getCurrentCoordinates();

    this.map.flyTo([coordinates.latitude, coordinates.longitude], 15);

  }
}
