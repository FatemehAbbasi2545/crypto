import { CommonModule } from '@angular/common';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { BaseComponent } from './../../abstract/base-component';
import { AssetHistoryResponse, CryptoCurrency } from './../../model/crypto.interface';
import { CryptoCurrencyService } from './../../service/crypto-currency.service';
import { CryptoTableComponent } from './../../ui/crypto-table/crypto-table.component';
import { TableOptions } from './../../model/table.model';

@Component({
  selector: 'crypto-currency-list',
  standalone: true,
  imports: [CommonModule, CryptoTableComponent],
  templateUrl: './crypto-currency-list.component.html',
  styleUrl: './crypto-currency-list.component.css'
})
export class CryptoCurrencyListComponent extends BaseComponent {  
  @Input() set dataLoaded(value: boolean) {
    if (value) {
      this.dataList = this.cryptoCurrencyService.cryptoCurrencies;
    }
  }

  dataList: Array<CryptoCurrency> = [];

  tableOptions = new TableOptions({
    displayedColumns: ['name', 'priceUsd'],
    columns: [
      { colDef: 'name', headerCellDef: 'Name' },
      { colDef: 'priceUsd', headerCellDef: 'Price' },
      { colDef: 'changeBackgroundColor', inVisible: true }
    ]
  });

  constructor(public cryptoCurrencyService: CryptoCurrencyService) {
    super();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.cryptoCurrencyService.currencyPrices$.subscribe({
        next: (data: any) => this.handleCurrencyPriceChange(data),
        error: err => console.log(err)
      })
    );
  }

  handleCurrencyPriceChange(data: any){
    console.log(data);
    const keys = Object.keys(data);
    for (const currency of this.cryptoCurrencyService.cryptoCurrencies) {
      if (keys.includes(currency.id)) {
        currency.priceUsd = data[currency.id];
        (currency as any)['changeBackgroundColor'] = true;
        setTimeout(() => {
          (currency as any)['changeBackgroundColor'] = false;
        }, 500);
      }    
    }
  }

  handleRowClick(id: string): void {
    this.cryptoCurrencyService.currentRowChanged$.next(id);
    this.subscription.add(
      this.cryptoCurrencyService.getCurrencyHistory(id).subscribe((result: AssetHistoryResponse) => {                 
        this.cryptoCurrencyService.selectedCurrencyHistory$.next(result.data);      
      })
    ); 
  }
}
