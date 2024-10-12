import { Component, OnDestroy, OnInit } from '@angular/core';

import { BaseComponent } from './../../abstract/base-component';
import { CryptoCurrencyService } from './../../service/crypto-currency.service';
import { CryptoCurrencyListComponent } from './../crypto-currency-list/crypto-currency-list.component';
import { CryptoCurrencyDetailComponent } from './../crypto-currency-detail/crypto-currency-detail.component';
import { AssetsResponse } from './../../model/crypto.interface';

@Component({
  selector: 'crypto-currency',
  standalone: true,
  imports: [CryptoCurrencyDetailComponent, CryptoCurrencyListComponent],
  providers: [CryptoCurrencyService],
  templateUrl: './crypto-currency.component.html',
  styleUrl: './crypto-currency.component.css'
})
export class CryptoCurrencyComponent extends BaseComponent implements OnInit, OnDestroy {
  currenciesLoaded = false;

  constructor(private cryptoCurrencyService: CryptoCurrencyService) {
    super();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.cryptoCurrencyService.getCryptoCurrencies().subscribe((result: AssetsResponse) => {                 
        this.cryptoCurrencyService.cryptoCurrencies = result.data;
        this.currenciesLoaded = true;
      })
    ); 
  }
}
