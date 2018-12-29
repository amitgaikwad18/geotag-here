import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Geocoords } from '../model/geocoords.model';

@Injectable({providedIn: 'root'})
export class GeoCoordsService {

    private coordinates: Geocoords;
    private coords: Geocoords[] = [];

    private coordsUpdated = new Subject<Geocoords[]>();

    getCurrentCoordinates() {
        return this.coordinates;
    }

    setCurrentCoordinates(lat: any, lng: any) {
        const coordinates = {latitude: lat, longitude: lng};
        this.coordinates = coordinates;
        return this.coordinates;
    }

//     getCoordinates() {
//         return [...this.coords];
//     }

//     getCoordsUpdateListener() {
//         return this.coordsUpdated.asObservable();
//     }

//     setCoordinates(lat: number, lng: number) {

//         const coordinates: Geocoords = {lat: lat, lng: lng};
//         this.coordinates = coordinates;
//         this.coords.push(this.coordinates);
//         this.coordsUpdated.next();
//     }
}
