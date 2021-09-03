import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

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

  draw() {
    let width = 750;
    let height = 750;

    const svg = d3.select('svg').attr('id', 'map').attr("width", width).attr("height", height);
    const projection = d3.geoAlbers()
    const path: any = d3.geoPath().projection(projection)

    d3.json("/assets/peru.json").then(function(json: any) {
      const geojson: any = topojson.feature(json, json.objects.departments);
      projection.rotate([60, 40]).fitExtent([[0, 0], [width, height]], geojson);

      svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", 1.5)
        .attr('fill', '#DCE1EA');
      
      d3.csv("/assets/markers.csv").then(function(data) {
        
        svg.selectAll("image")
          .data(data)
          .enter()
          .append("image")
          .attr('width', 14)
          .attr('height', 14)
          .attr("transform", ((d: any) => `translate(${projection([d.lon,d.lat])})`))
          .attr("xlink:href",'/assets/vector.png')
          .style("opacity", 1)
          .style('cursor', 'pointer')
          .on('click', function() {
            d3.selectAll('image').attr("xlink:href",'/assets/dvector.png').attr('width', 14).attr('height', 14);
            d3.select(this).attr("xlink:href",'/assets/marker.png').attr('height', 20);
          });

        svg.selectAll('text')
          .data(data)
          .enter()
          .append('text') 
          .attr("transform", ((d: any) => {
            return `translate(${projection([d.lon - (d.place.length * 0.045),d.lat - 0.700])})`;
          }))
          .attr("font-size", "10")
          .text((d: any) => d.place);
      });
    });
  }
}
