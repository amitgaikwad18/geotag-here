import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plot } from '../../model/plot.model';
import { Subscription } from 'rxjs';
import { PlotsService } from '../../services/plots.service';

import { IonTabs } from '@ionic/angular';
import { GeoCoordsService } from 'src/app/services/geocoords.service';

@Component({
  selector: 'app-plots-list',
  templateUrl: './plots-list.component.html',
  styleUrls: ['./plots-list.component.scss']
})
export class PlotsListComponent implements OnInit, OnDestroy {

  // currentCoords: any;

  private plot: Plot;

  plots: Plot[] = [];
  private plotsSub: Subscription;

  constructor(public plotsService: PlotsService, private ionTabs: IonTabs,
    public geoService: GeoCoordsService) { }

  ngOnInit() {
    this.plotsService.getPlots();
    this.plotsSub = this.plotsService.getPlotsAddListener()
    .subscribe((plots: Plot[]) => {
      this.plots = plots;
    });

  }

  deletePlot(plotId: string) {
    this.plotsService.deletePlot(plotId);
  }

  routeMap() {
    this.ionTabs.select('geo-tag');
  }

  ngOnDestroy() {
    this.plotsSub.unsubscribe();
  }

  onTagPlot(plotId: string) {

    this.plot = this.plotsService.getPlot(plotId);
    const currentCoords = this.geoService.getCurrentCoordinates();
    this.plotsService.geoTagPlot(plotId, currentCoords.latitude, currentCoords.longitude);


  }
}
