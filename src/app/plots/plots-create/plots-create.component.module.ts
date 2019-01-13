import { NgModule } from '@angular/core';
import { PlotsCreateComponent } from './plots-create.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ PlotsCreateComponent ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        // IonicPageModule.forChild(PlotsCreateComponent),
        // RouterModule.forChild([{ path: '', component: PlotsCreateComponent }])
    ],
    exports: [ PlotsCreateComponent ],
})

export class PlotsCreateModule {}
