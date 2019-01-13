import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plot } from '../../model/plot.model';
import { Subscription } from 'rxjs';
import { PlotsService } from '../../services/plots.service';

@Component({
  selector: 'app-plots-list',
  templateUrl: './plots-list.component.html',
  styleUrls: ['./plots-list.component.scss']
})
export class PlotsListComponent implements OnInit, OnDestroy {

  plots: Plot[] = [];
  private plotsSub: Subscription;

  constructor(public plotsService: PlotsService) { }

  ngOnInit() {
    this.plotsService.getPlots();
    this.plotsSub = this.plotsService.getPlotsAddListener()
    .subscribe((plots: Plot[]) => {
      this.plots = plots;
    });

  }

  ngOnDestroy() {
    this.plotsSub.unsubscribe();
  }



}
