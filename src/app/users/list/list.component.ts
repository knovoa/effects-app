import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartSelectionChangedEvent, ChartType } from 'angular-google-charts';
import { User } from 'src/app/models/user.model';
import { load } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  error: any;

  myType = ChartType.GeoChart;
  myOptions = {
    //displayMode: 'markers',
    region: 'PE',
    resolution: 'provinces',
    defaultColor: '#C3CBCD',
    datalessRegionColor: '#123456',
    backgroundColor: {
      stroke: 'black',
      strokeWidth: 1
    }
  }
  myData = [
    ['Regions'],
    ['El Callao'],
    ['Lima'],
    ['Puno'],
    ['Cuzco'],
    ['Piura'],
    ['Loreto'],
    ['Ayacucho'],
    ['Arequipa'],
    ['Tumbes'],
    ['Tacna'],
    ['Junín'],
    ['Cajamarca'],
    ['Ica'],
    ['Ucayali'],
    ['Moquegua'],
    ['Apurímac'],
    ['Huánuco'],
    ['Madre de dios'],
    ['Ancash'],
    ['Amazonas'],
    ['Huancavelica'],
    ['Pasco'],
    ['Lambayeque'],
    ['La Libertad'],
    ['San Martín']
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(load());

    this.store.select('users').subscribe((users) => {
      this.users = users.list;
      this.loading = users.loading;
      this.error = users.error;
    });
  }

  onSelect($event: ChartSelectionChangedEvent) {
    if ($event.selection.length > 0) {
      console.log($event.selection[0].row);
    }
  }
}
