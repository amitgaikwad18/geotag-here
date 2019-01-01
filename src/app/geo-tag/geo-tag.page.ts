import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import * as LDraw from 'leaflet-draw';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GeoCoordsService } from '../services/geocoords.service';
import { Geocoords } from '../model/geocoords.model';
import { stringify } from '@angular/compiler/src/util';

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

  coordinates: Geocoords;

  constructor(private geolocation: Geolocation, public geocoordsService: GeoCoordsService) {}

  ngOnInit() {

    this.coordinates = this.geocoordsService.getCurrentCoordinates();
    console.log('Coordinates from Geotag >>> ' + this.coordinates.latitude.toPrecision(4));
    console.log('Coordinates from Geotag >>> ' + this.coordinates.longitude.toPrecision(4));

    this.lat = parseInt(this.coordinates.latitude.toPrecision(4), 10);
    this.lng = parseInt(this.coordinates.longitude.toPrecision(4), 10);

    this.map = L.map('mapid').setView([this.coordinates.latitude, this.coordinates.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.coordinates.latitude, this.coordinates.longitude])
    .bindPopup('Latitude: ' + this.coordinates.latitude + ', Longitude: ' + this.coordinates.longitude)
    .addTo(this.map);

    // this.map.flyTo([this.coordinates.latitude, this.coordinates.longitude], 15);
  }

  recenter() {

    let rectrCoords = this.geocoordsService.getCurrentCoordinates();

    this.map.flyTo([rectrCoords.latitude, rectrCoords.longitude], 15);

  }

  dropMarker() {

    let latlngs = [[this.coordinates.latitude, this.coordinates.longitude]];

    let crntcoords = this.geocoordsService.getCurrentCoordinates();

    console.log('Coordinates from Geotag >>> ' + crntcoords.latitude.toPrecision(4));
    console.log('Coordinates from Geotag >>> ' + crntcoords.longitude.toPrecision(4));

    L.marker([crntcoords.latitude, crntcoords.longitude])
    .addTo(this.map);

    latlngs.push([crntcoords.latitude, crntcoords.longitude]);

    console.log(latlngs);

    // let polylines = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
    let polygon = L.polygon(latlngs, {color: 'red'}).addTo(this.map);



  }
}
