import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sqLite: SQLite,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.initializeDB();

    });
  }
  initializeDB () {
    const dbConnection = this.sqLite.create({
      name: 'my_database.sqlite',
      location: 'default'
    });
    if (dbConnection == null) {
      console.log('DB Error');
    }
    dbConnection
    .then((db: SQLiteObject) => {
      db.executeSql('create table gposition(id INTEGER PRIMARY KEY, latituge NUMERIC, longitude NUMERIC)', [])
      .then(() => console.log('Table Created'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log('from error'));
  }
}
