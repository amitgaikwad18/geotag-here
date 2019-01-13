import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GeoCoordsService } from './services/geocoords.service';
import { Geocoords } from './model/geocoords.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    private geocoordsservice: GeoCoordsService
  ) {}

  ngOnInit() {
    this.splashScreen.show();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready()
    .then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.initializeDB();
      this.initializeLocation();
      this.splashScreen.hide();
    });
  }

  initializeLocation() {

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

  }
  // initializeDB () {
  //   const dbConnection = this.sqLite.create({
  //     name: 'my_database.sqlite',
  //     location: 'default'
  //   });
  //   if (dbConnection == null) {
  //     console.log('DB Error');
  //   }
  //   dbConnection
  //   .then((db: SQLiteObject) => {
  //     db.executeSql('create table gposition(id INTEGER PRIMARY KEY, latituge NUMERIC, longitude NUMERIC)', [])
  //     .then(() => console.log('Table Created'))
  //     .catch(e => console.log(e));
  //   })
  //   .catch(e => console.log('from error'));
  // }
}
