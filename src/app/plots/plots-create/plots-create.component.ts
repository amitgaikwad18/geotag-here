import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlotsService } from 'src/app/services/plots.service';

@Component({
  selector: 'app-plots-create',
  templateUrl: './plots-create.component.html',
  styleUrls: ['./plots-create.component.scss']
})
export class PlotsCreateComponent implements OnInit {

  constructor(public plotsService: PlotsService) { }

  ngOnInit() {
  }

  onAddPlot(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.plotsService.addPlot(form.value.plotName);
  }

}
