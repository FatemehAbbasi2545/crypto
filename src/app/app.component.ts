import { RouterOutlet } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CryptoCurrencyComponent } from './crypto/component/crypto-currency/crypto-currency.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CryptoCurrencyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crypto';
}
