import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GeoCoordsService } from '../services/geocoords.service';
import { Geocoords } from '../model/geocoords.model';
import { environment } from '../../environments/environment.prod';
import { PlotsService } from '../services/plots.service';

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

  constructor(private geolocation: Geolocation, public geocoordsService: GeoCoordsService,
    public plotService: PlotsService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {

    this.coordinates = this.geocoordsService.getCurrentCoordinates();
    console.log('Coordinates from Geotag >>> ' + this.coordinates.latitude.toPrecision(4));
    console.log('Coordinates from Geotag >>> ' + this.coordinates.longitude.toPrecision(4));

    this.lat = parseInt(this.coordinates.latitude.toPrecision(4), 10);
    this.lng = parseInt(this.coordinates.longitude.toPrecision(4), 10);

   // mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pdGdhaWt3YWQ4NSIsImEiOiJjanFzMDYwbHEwaHd4NDJsanIzZ2hqbDFyIn0.H4c917HglXZhvgSdrTjhZA';

    let lnglat = new mapboxgl.LngLat(this.coordinates.longitude, this.coordinates.latitude); 

    this.map = new mapboxgl.Map({
      container: 'mapid', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: lnglat, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.map.on('load', () => {
      this.map.resize();
    });


    // this.map = L.map('mapid').setView([this.coordinates.latitude, this.coordinates.longitude], 15);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map);

    // L.marker([this.coordinates.latitude, this.coordinates.longitude])
    // .bindPopup('Latitude: ' + this.coordinates.latitude + ', Longitude: ' + this.coordinates.longitude)
    // .addTo(this.map);

    // this.polygonLatLngs.push(L.latLng(this.coordinates.latitude, this.coordinates.longitude));

    // const helloPopup = L.popup().setContent('Hello World!');

    // L.easyButton('fa-globe', function() {
    //   helloPopup.setLatLng(this.map.getCenter()).openOn(this.map);
    // }).addTo( this.map );

    // this.map.flyTo([this.coordinates.latitude, this.coordinates.longitude], 15);
  }

  recenter() {

    let rectrCoords = this.geocoordsService.getCurrentCoordinates();

    this.map.flyTo([rectrCoords.latitude, rectrCoords.longitude], 15);

  }

  dropMarker() {

    let currentLat: any;
    let currrentLng: any;

    // const startingLat = this.coordinates.latitude;
    // const starttingLng = this.coordinates.longitude;

    // // const latlngs = new L.LatLng(startingLat, starttingLng);

    // this.polygonLatLngs.push(L.latLng(startingLat, starttingLng));

    const crntcoords = this.geocoordsService.getCurrentCoordinates();

    currentLat = crntcoords.latitude;
    currrentLng = crntcoords.longitude;

    console.log('Coordinates from Geotag >>> ' + crntcoords.latitude.toPrecision(4));
    console.log('Coordinates from Geotag >>> ' + crntcoords.longitude.toPrecision(4));


    L.marker(L.latLng(currentLat, currrentLng))
    .addTo(this.map);


    this.polygonLatLngs.push(L.latLng(currentLat, currrentLng));

  }

  drawPolygon() {

    console.log(this.polygonLatLngs);

    let polygon = L.polygon(this.polygonLatLngs, {color: 'red'}).addTo(this.map);

    this.map.fitBounds(polygon.getBounds());

  }

  reset() {

    // this.coordinates = {latitude: 0, longitude: };

    this.polygonLatLngs = [];

  }
}
