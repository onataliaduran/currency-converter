import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from 'src/app/services/exchangeRates/exchange-rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  public amount: number | undefined;
  public rates: { [key: string]: number; } | undefined;
  public from = 'USD';
  public to = 'EUR';

  constructor(private exchangeRates: ExchangeRatesService) { }

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.exchangeRates.getRates(this.from).subscribe(res => this.rates = res.rates);
  }

  getAllCurrencies(): string[] {
    const allRates = this.rates ? this.rates : [];
    return Object.keys(allRates);
  }

  getConvertion(): number {
    const total = this.amount ? this.amount : 0;
    const currency = this.rates ? this.rates[this.to] : 0;
    return total * currency;
  }

}
