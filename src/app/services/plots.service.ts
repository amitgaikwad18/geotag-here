import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Plot } from '../model/plot.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PlotsService {

    private plots: Plot[] = [];
    private plotsAdded = new Subject<Plot[]>();

    constructor(private httpClient: HttpClient) {}

    getPlots() {
        this.httpClient
        .get<{message: string, plots: any}>(environment.app_url + '/api/plots')
        .pipe(map((plotData) => {
            return plotData.plots.map((plot) => {
                return {
                    id: plot._id,
                    plotName: plot.plotName
                };
            });
        }))
        .subscribe((transformedPlots) => {
            this.plots = transformedPlots;
            this.plotsAdded.next([...this.plots]);
        });

    }

    getPlotsAddListener() {
       return this.plotsAdded.asObservable();
    }

    addPlot(plotName: string) {
        const plot: Plot = {id: null, plotName: plotName};
        this.httpClient.post<{message: string, plotId: string }>(environment.app_url + '/api/plots', plot)
        .subscribe((responseData) => {
            plot.id = responseData.plotId;
            this.plots.push(plot);
            this.plotsAdded.next([...this.plots]);
        });

    }

    deletePlot(plotId: string) {
        this.httpClient
        .delete(environment.app_url + '/api/plots/' + plotId)
        .subscribe(() => {
            const updatedPlots = this.plots.filter(plot => plot.id !== plotId);
            this.plots = updatedPlots;
            this.plotsAdded.next([...this.plots]);
        });
    }

}
