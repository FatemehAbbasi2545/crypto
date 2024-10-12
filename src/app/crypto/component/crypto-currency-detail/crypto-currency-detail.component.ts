import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BaseComponent } from './../../abstract/base-component';
import { CurrencyHistory } from './../../model/crypto.interface';
import { CryptoCurrencyService } from './../../service/crypto-currency.service';
import { CryptoChartComponent } from './../../ui/crypto-chart/crypto-chart.component';
import { monthNames } from './../../model/crypto-constants';

@Component({
  selector: 'crypto-currency-detail',
  standalone: true,
  imports: [CommonModule, CryptoChartComponent],
  templateUrl: './crypto-currency-detail.component.html',
  styleUrl: './crypto-currency-detail.component.css'
})
export class CryptoCurrencyDetailComponent extends BaseComponent implements OnInit {
  start: string = '';
  end: string = '';

  chartData: any[] = [];

  historyChange = false;
  showComponent = false;

  constructor(private cryptoCurrencyService: CryptoCurrencyService) {
    super();
  }

  ngOnInit(): void {    
    this.subscription.add(
      this.cryptoCurrencyService.currentRowChanged$.subscribe({
        next: (id) => {
          this.showComponent = false;         
          this.historyChange = true;
        }
      })
    )
    this.subscription.add(
      this.cryptoCurrencyService.selectedCurrencyHistory$.subscribe({
        next: (data) => {          
          this.changeData(data);          
        }
      })
    )
  }

  changeData(data: CurrencyHistory[]) {    
    const startDate = new Date(data[0].date);
    this.start = `${this.getMonth(startDate)} ${startDate.getFullYear()}`;
    
    const endDate = new Date(data[data.length - 1].date);
    this.end = `${this.getMonth(endDate)} ${endDate.getFullYear()}`;  

    this.chartData = data.map(x => parseFloat(x.priceUsd));
    this.showComponent = true;   
  }

  getMonth(date: Date) {
    const month = monthNames.find((x) => x.key === date.getMonth());
    return month ? month.value : 'October';
  }
}
