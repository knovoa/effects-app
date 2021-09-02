import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-charts-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  loading: boolean;
  lcImageDownload: any;
  lcMyType = ChartType.LineChart;
  lcMyOptions: any = {};
  lcMyColumns: any = [];
  lcMyData: any = [];
  
  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.load();
    }, 3000);
  }

  load() {
    this.lcMyOptions = {
      legend: {
        position: 'none'
      },
      pointsVisible: true,
      vAxis: {
        textStyle: {
          fontSize: 12,
          color: '#727B7D'
        }
      },
      hAxis: {
        textStyle: {
          fontSize: 12,
          color: '#727B7D'
        }
      },
      series: {
        0: {
          annotations: {
            textStyle: {
              strokeWidth: 0,
              fontSize: 12,
              color: '#3C63B0'
            }
          }
        }
      },
      annotations: {
        stemColor: 'none',
        alwaysOutside: true
      }
    }
    this.lcMyColumns = [
      { type: 'string', role: 'domain', label: 'Month' },
      { type: 'number', role: 'data', label: 'Salary' },
      { type: 'string', role: 'annotation', label: 'Salary' },
      { type: 'string', role: 'annotationText', label: 'Description' }
    ];
    this.lcMyData = [
      ['2020-05', 3150, 'S/ 3,150', 'Some text'],
      ['2020-06', 2850, 'S/ 2,850', null],
      ['2020-07', 4100, 'S/ 4,100', null],
      ['2020-08', 4350, 'S/ 4,350', null],
      ['2020-09', 5700, 'S/ 5,700', null],
      ['2020-10', 4650, 'S/ 4,650', null],
      ['2020-11', 3400, 'S/ 3,400', 'Some text'],
      ['2020-12', 3010, 'S/ 3,010', null],
      ['2021-01', 4578, 'S/ 4,578', null],
      ['2021-02', 3879, 'S/ 3,879', null],
      ['2021-03', 3123, 'S/ 3,123', 'Some text'],
      ['2021-04', 4423, 'S/ 4,423', null],
      ['2021-05', 3975, 'S/ 3,975', null]
    ];
    this.loading = false;
  }

  onLineChartSelect($event: any) {
    if ($event.selection.length > 0) {
      console.log($event.selection[0].row);
    }
  }

  onLineChartReady($event: any) {
    this.lcImageDownload = $event.chart.getImageURI();
  }

  demo() {
    let download = document.createElement('a');
    download.href = this.lcImageDownload;
    download.download = 'Tendencia de remuneraciones mensual';
    download.click();
  }
}
