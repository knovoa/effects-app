import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

let cityName: '';

@Component({
  selector: 'app-charts-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  async draw() {
    const topology: any = await d3.json('/assets/peru.json');
    const geojson: any = topojson.feature(topology, topology.objects.departments)
    const svg = d3.select('svg').attr('id', 'map')
    const projection = d3.geoAlbers()
    const path: any = d3.geoPath().projection(projection)

    let width = 750;
    let height = 750;
    projection.rotate([60, 40]).fitExtent([ [ 0, 0 ], [ width, height ] ], geojson);

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
  }

  demo() {
    if (cityName === undefined) {
      return;
    }
    alert('City: ' + cityName);
  }
}
