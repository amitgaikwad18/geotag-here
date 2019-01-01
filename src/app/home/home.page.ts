import { Component, OnInit, OnDestroy } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';


import { GeoCoordsService } from '../services/geocoords.service';
import { Geocoords } from '../model/geocoords.model';
import { throwError } from 'rxjs';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {

  // lat: any;
  // lng: any;

  coordinates: Geocoords;
  // coordsList: Geocoords[] = [];

  constructor(private geolocation: Geolocation, public geocoordsservice: GeoCoordsService) {}

  ngOnInit() {

    this.geolocation.getCurrentPosition()
    .then((resp) => {
      console.log('This is initialization');
      // this.coordinates = {latitude: resp.coords.latitude, longitude: resp.coords.longitude};
      this.geocoordsservice.setCurrentCoordinates(resp.coords.latitude, resp.coords.longitude);
    })
    .catch((error) => {
      console.log('Error getting position ', error);
    });

    let watch = this.geolocation.watchPosition()
    .subscribe((resp) => {
      console.log('This is Watch');
      this.geocoordsservice.setCurrentCoordinates(resp.coords.latitude, resp.coords.longitude);
    });

    this.coordinates = this.geocoordsservice.getCurrentCoordinates();
    // console.log(coordinates)
  }


}
