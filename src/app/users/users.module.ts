import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot({
      mapsApiKey: 'AIzaSyAJV560z8d7XgrM73DID5Odd3op2Uq-oS8'
    })
  ],
  exports: [
    ListComponent,
    DetailComponent
  ]
})
export class UsersModule { }
