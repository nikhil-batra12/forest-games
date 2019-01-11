import { CashierService } from 'src/app/cashier/services/cashier.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CashierResolver implements Resolve<any> {

  constructor(
    private cashierService: CashierService
  ) { }
  resolve(): Observable<any> {
    return this.cashierService.getPackageCoins();
  }
}
