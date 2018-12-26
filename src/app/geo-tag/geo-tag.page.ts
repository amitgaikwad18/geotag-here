import { Component, OnInit } from '@angular/core';

declare const H;

@Component({
  selector: 'app-geotag',
  templateUrl: 'geo-tag.page.html',
  styleUrls: ['geo-tag.page.scss']
})

export class GeoTagPage implements OnInit {

  herePlatform;

  constructor() {
    this.herePlatform =   new H.service.Platform({
      'app_id': 'nSmddOydoGMXfBKZyKua',
      'app_code': 'dwMDkaLW9RWFwkZ5DfR9iA'
    });
  }
  ngOnInit() {

    const defaultLayers = this.herePlatform.createDefaultLayers();
    const map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.normal.map,
      {
        zoom: 10,
        // center: { lat: 52.5, lng: 13.4 }
      });
  }
}
