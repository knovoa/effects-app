import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { MapComponent } from './charts/map/map.component';
import { DetailComponent } from './users/detail/detail.component';
import { ListComponent } from './users/list/list.component';

const routes: Routes = [
  { path: 'home', component: ListComponent},
  { path: 'users/:id', component: DetailComponent},
  { path: 'charts', component: ChartsComponent},
  { path: 'map', component: MapComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
