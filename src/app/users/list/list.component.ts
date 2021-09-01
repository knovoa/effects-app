import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartSelectionChangedEvent, ChartType } from 'angular-google-charts';
import { User } from 'src/app/models/user.model';
import { load } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.reducers';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

let cityName: '';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  error: any;

  //cityName: String = '';

  myType = ChartType.Table;
  myOptions = {
    //displayMode: 'markers',
    region: 'PE',
    resolution: 'provinces',
    defaultColor: '#C3CBCD',
    datalessRegionColor: '#123456'
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

    this.draw();
  }

  onSelect($event: ChartSelectionChangedEvent) {
    if ($event.selection.length > 0) {
      console.log($event.selection[0].row);
    }
  }

  async draw() {
    const topology: any = await d3.json('/assets/peru.json');

    const geojson = topojson.feature(topology, topology.objects.departments)
    const svg = d3.select('svg').attr('id', 'map')
    const projection = d3.geoAlbers()
    const path = d3.geoPath().projection(projection)

    let width = 750;
    let height = 750;
    projection.rotate([60, 40]).fitExtent([ [ 0, 0 ], [ width, height ] ], geojson);

    let cities = [
      {
        lng: -12.30200325453761,
        lat: -76.57102540839436
      },
      {
        lng: -4.269263755674196,
        lat: -74.47440370503764
      },
      {
        lng: -17.512823050613296,
        lat: -70.19380106068432
      }
    ];

    svg
      .attr('width', width)
      .attr('height', height)
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', '#DCE1EA')
      .attr('stroke', 'white')
      .on('mouseover', function(d) {
        d3.select(this).classed('selected', true);
      })
      .on('mouseout', function(d) {
        d3.select(this).classed('selected', false);
      })
      .on('click', function(d,i: any) {
        cityName = i.properties.NOMBDEP;
      });

    svg
      .selectAll("g")
      .data(cities)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + projection([d.lng, d.lat]) + ")";
      })
      .append("circle")
      .attr("r", 1)
  }

  demo() {
    if (cityName === undefined) {
      return;
    }
    alert('City: ' + cityName);
  }
}
