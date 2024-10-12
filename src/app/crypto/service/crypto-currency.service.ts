import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ApiService } from './api.service';
import { AssetHistoryResponse, AssetsResponse, CryptoCurrency, CurrencyHistory } from './../model/crypto.interface';

@Injectable()
export class CryptoCurrencyService { 
  cryptoCurrencies: Array<CryptoCurrency> = []; 

  currentRowChanged$ = new Subject<string>();
  selectedCurrencyHistory$ = new Subject<Array<CurrencyHistory>>();

  constructor(private api: ApiService) {}

  getCryptoCurrencies(): Observable<AssetsResponse> {
    return this.api.get<AssetsResponse>('https://api.coincap.io/v2/assets');
  }

  getCurrencyHistory(id: string): Observable<AssetHistoryResponse> {
    const url = `https://api.coincap.io/v2/assets/${id}/history?interval=d1`;
    return this.api.get<AssetHistoryResponse>(url);
  }
}
