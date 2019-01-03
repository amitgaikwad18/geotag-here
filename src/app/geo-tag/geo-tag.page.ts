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

  polygonLatLngs = [];

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

    let currentLat: any;
    let currrentLng: any;

    const startingLat = this.coordinates.latitude;
    const starttingLng = this.coordinates.longitude;

    const latlngs = [new L.LatLng(startingLat, starttingLng)];

    this.polygonLatLngs.push(latlngs);

    const crntcoords = this.geocoordsService.getCurrentCoordinates();

    currentLat = crntcoords.latitude;
    currrentLng = crntcoords.longitude;

    console.log('Coordinates from Geotag >>> ' + crntcoords.latitude.toPrecision(4));
    console.log('Coordinates from Geotag >>> ' + crntcoords.longitude.toPrecision(4));

    L.marker([crntcoords.latitude, crntcoords.longitude])
    .addTo(this.map);

    this.polygonLatLngs.push(new L.LatLng(crntcoords.latitude, crntcoords.longitude));

    // // let polylines = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
    // let polygon = L.polygon(latlngs, {color: 'red'}).addTo(this.map);

    // let latlngs = [new L.LatLng(37.23, -109.05)];
    //   latlngs.push(new L.LatLng(41.45, -109.03));
    //   latlngs.push(new L.LatLng(41.47, -102.0));
    //   latlngs.push(new L.LatLng(37.54, -102.04));

    //   L.marker(new L.LatLng(37, -109.05))
    //   .bindPopup('37, -109.05')
    //   .addTo(this.map);

    //   L.marker(new L.LatLng(41, -109.03))
    //   .bindPopup('41, -109.03')
    //   .addTo(this.map);

    //   L.marker(new L.LatLng(41, -102.0))
    //   .bindPopup('41, -102.0')
    //   .addTo(this.map);

    //   L.marker(new L.LatLng(37, -102.04))
    //   .bindPopup('37, -102.04')
    //   .addTo(this.map);

    //let polygon = L.polygon(latlngs, {color: 'red'}).addTo(this.map);

  }

  drawPolygon() {

    let polygon = L.polygon(this.polygonLatLngs, {color: 'red'}).addTo(this.map);

    this.map.fitBounds(polygon.getBounds());
  }
}
