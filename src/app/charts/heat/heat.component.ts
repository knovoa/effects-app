import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

let cityName: '';

@Component({
  selector: 'app-charts-heat',
  templateUrl: './heat.component.html',
  styleUrls: ['./heat.component.scss']
})
export class HeatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  draw() {
    let width = 750;
    let height = 750;

    const svg = d3.select('svg').attr('id', 'map').attr("width", width).attr("height", height);
    const div = d3.select("div#content").append("div").attr("class", "tooltip").style("opacity", 0);

    const projection = d3.geoAlbers()
    const path: any = d3.geoPath().projection(projection)
    var color = d3.scaleLinear(["#F5DCC7","#D09261"]);

    d3.csv("/assets/heat.csv").then(function(heat: any) {
      color.domain([0, 1, 2, 3]);

      d3.json("/assets/peru.json").then(function(json: any) {
        const geojson: any = topojson.feature(json, json.objects.departments);
        projection.rotate([60, 40]).fitExtent([[0, 0], [width, height]], geojson);

        for (var i = 0; i < heat.length; i++) {
          var dataState = heat[i].state;
          var dataValue = heat[i].visited;

          for (var j = 0; j < json.objects.departments.geometries.length; j++) {
            var jsonState = json.objects.departments.geometries[j].properties.NOMBDEP;

            if (dataState == jsonState) {
              json.objects.departments.geometries[j].properties.visited = dataValue;
              break;
            }
          }
        }

        svg.selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("stroke", "#fff")
          .style("stroke-width", "1")
          .style("fill", function (d: any) {
            var value = d.properties.visited;
            if (value) {
              return color(value);
            } else {
              return "#DCDCDC";
            }
          })
          .on('click', function(d,i: any) {
            console.log(d);
            console.log(i);
            cityName = i.properties.NOMBDEP;
          });
        
      // Map the cities I have lived in!
      d3.csv("/assets/markers.csv").then(function(data) {
        svg.selectAll(".image")
          .data(data)
          .enter()
          .append("image")
          .attr('width', 15)
          .attr('height', 15)
          .attr("transform", ((d: any) => `translate(${projection([d.lon,d.lat])})`))
          .attr("xlink:href",'/assets/vector.png')
          .style("opacity", 1)
          .style('cursor', 'pointer')
          .on('mouseover', function(event: any, d: any) {
              div.transition().duration(200).style("opacity", .9);     
              div.text(() => {
                for (var i = 0; i < heat.length; i++) {
                  if (heat[i].state === d.place) {
                    return `${d.place}: S/. ${heat[i].heat}`;
                  }
                }
                return null;
              })
              .style("left", (event.pageX) + "px")     
              .style("top", (event.pageY - 28) + "px"); 
          })
          .on("mouseout", function(d) {
            div.transition().duration(500).style("opacity", 0);
          })
          .on('click', function(d,i) {
            console.log(d);
            console.log(i);
          });

          svg.selectAll('.text')
            .data(data)
            .enter()
            .append('text') 
            .attr("transform", ((d: any) => {
              console.log(d.place.length)
              return `translate(${projection([d.lon - (d.place.length * 0.04),d.lat - 0.700])})`
            }))
            .attr("font-size", "10")
            .text((d: any) => d.place)
        });
      });
    });
  }

  demo() {
    if (cityName === undefined) {
      return;
    }
    alert('City: ' + cityName);
  }
}
