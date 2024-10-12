import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { HighchartsChartModule} from 'highcharts-angular';
import * as Highcharts from 'highcharts';

import Accessibility from 'highcharts/modules/accessibility';
Accessibility(Highcharts);

import { Subject } from 'rxjs';

@Component({
  selector: 'crypto-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './crypto-chart.component.html',
  styleUrl: './crypto-chart.component.css'
})
export class CryptoChartComponent {
  @Input() get chartData() {
    return this._chartData;
  }

  set chartData(value) {
    this._chartData = value;
    this.setChartOptions();   
  }
  
  highcharts = Highcharts;
  
  chartOptions: Highcharts.Options = {
    title: {
      text: 'exchange rate over time',
      align: 'left'
    },
    xAxis: {
      categories: ['October 2023 ', 'November 2023 ', 'December 2023', 'January 2024',
        'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024', 'July 2024', 'August 2024',
        'September 2024', 'October 2024'
      ]
    },
    yAxis: {
      title: {
        text: 'Exchange rate'
      }
    },
    legend: {
      enabled: false
    }
  };

  chartOptions$ = new Subject<Highcharts.Options>();
  
  _chartData: any[] = [];

  setChartOptions() { 
    Highcharts.setOptions({
      series: [{
        data:  this.chartData,   
        type: 'spline'
      }]
    });    
    this.chartOptions$.next(this.chartOptions);
  }
}
