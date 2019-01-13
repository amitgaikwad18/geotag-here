import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { PlotsCreateModule } from '../plots/plots-create/plots-create.component.module';
import { PlotsListModule } from '../plots/plots-list/plots-list.component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlotsCreateModule,
    PlotsListModule,
    RouterModule
    .forChild([
      { path: '', component: HomePage },
      { path: 'plots', component: PlotsCreateModule}
    ]),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
