import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './users/detail/detail.component';
import { ListComponent } from './users/list/list.component';

const routes: Routes = [
  { path: 'home', component: ListComponent},
  { path: 'users/:id', component: DetailComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
