import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Plot } from '../model/plot.model';

@Injectable({providedIn: 'root'})
export class PlotsService {

    private plots: Plot[] = [];
    private plotsAdded = new Subject<Plot[]>();

    constructor(private httpClient: HttpClient) {}

    getPlots() {
        this.httpClient.get<{message: string, plots: Plot[]}>('http://localhost:5000/api/plots')
        .subscribe((plotsData) => {
            this.plots = plotsData.plots;
            this.plotsAdded.next([...this.plots]);
        });

    }

    getPlotsAddListener() {
       return this.plotsAdded.asObservable();
    }

    addPlot(plotName: string) {
        const plot: Plot = {id: Math.floor((Math.random() * 6) + 1), plotName: plotName};
        this.httpClient.post<{message: string}>('http://localhost:5000/api/plots', plot)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.plots.push(plot);
            this.plotsAdded.next([...this.plots]);
        });

    }

}
