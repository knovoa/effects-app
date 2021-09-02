import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-charts-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  loading: boolean;
  bcImageDownload: any;
  bcMyType = ChartType.ColumnChart;
  bcMyOptions: any = {};
  bcMyColumns: any = [];
  bcMyData: any = [];

  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.load();
    }, 3000);
  }

  load() {
    this.bcMyData = [
      ['2020-05', 1102, '+1,102', -151, '-151'],
      ['2020-06', 655, '+655', -523, '-523'],
      ['2020-07', 876, '+876', -310, '-310'],
      ['2020-08', 534, '+534', -420, '-420'],
      ['2020-09', 1320, '+1320', -301, '-301'],
      ['2020-10', 452, '+452', -146, '-146'],
      ['2020-11', 82, '+82', -87, '-87'],
      ['2020-12', 98, '+98', -187, '-187'],
      ['2021-01', 564, '+564', -602, '-602'],
      ['2021-02', 1804, '+1804', -694, '-694'],
      ['2021-03', 754, '+754', -296, '-296'],
      ['2021-04', 1653, '+1653', -94, '-94'],
      ['2021-05', 352, '+352', -464, '-464']
    ];
    this.bcMyColumns = [
      { type: 'string', role: 'domain', label: 'Month' },
      { type: 'number', role: 'data', label: 'Nuevos contratos' },
      { type: 'string', role: 'annotation' },
      { type: 'number', role: 'data', label: 'Desvinculados' },
      { type: 'string', role: 'annotation' },
  
    ];
    this.bcMyOptions = {
      legend: {position: 'top', textStyle: {color: '#727B7D', fontSize: 12}},
      vAxis: {
        textPosition: 'none'
      },
      hAxis: {
        textStyle: {
          fontSize: 12,
          color: '#727B7D'
        }
      },
      annotations: {
        stemColor : 'none',
        alwaysOutside: true,
        highContrast: false
      },
      isStacked: true,
      tooltip: {
        ignoreBounds: true
      },
      series: {
        0: {
          color: "#3C63B0",
          backgroundColor: "#3C63B0",
          annotations: {
            stem: {
              length: 1
            },
            textStyle: {
              fontSize: 12, 
              color: '#3C63B0'
            }
          }
        },
        1: {
          color: "#B13C3C",
          backgroundColor: "#B13C3C",
          annotations: {
            stem: {
              length: -58
            },
            textStyle: {
              fontSize: 12, 
              color: '#B13C3C',
            }
          }
        }
      }
    };
    this.loading = false;
  }

  onBarChartSelect($event: any) {
    if ($event.selection.length > 0) {
      console.log($event.selection[0].row);
    }
  }

  onBarChartReady($event: any) {
    this.bcImageDownload = $event.chart.getImageURI();
  }

  bcDemo() {
    let download = document.createElement('a');
    download.href = this.bcImageDownload;
    download.download = 'Cantidad de trabajadores nuevos contratados y desvinculados';
    download.click();
  }
}
