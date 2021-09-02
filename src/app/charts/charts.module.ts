import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsComponent } from "./charts.component";
import { LineComponent } from './line/line.component';
import { BarComponent } from './bar/bar.component';
import { MapComponent } from "./map/map.component";

import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    ChartsComponent,
    LineComponent,
    BarComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule
  ],
  exports: [
    ChartsComponent,
    LineComponent,
    BarComponent,
    MapComponent
  ]
})
export class ChartsModule { }
