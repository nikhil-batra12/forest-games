import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderCoinsService {
  orderRequestObj: any = {};
  constructor( ) { }

  updateAmount(data: any) {
    this.orderRequestObj.coinId = data.coinId;
    this.orderRequestObj.amount = data.amount;
    this.orderRequestObj.bonus = data.bonus;
    this.orderRequestObj.promocode = data.promocode;
  }

  setPayment(data: any) {
    this.orderRequestObj.paymentMode = data.paymentMode;
    this.orderRequestObj.paymentDetails = {};
    this.orderRequestObj.paymentDetails = data.details;
  }

  getOrderKey(key) {
    return this.orderRequestObj[key] ? this.orderRequestObj[key] : null;
  }

  clearPreviousOrder() {
    this.orderRequestObj = {};
  }
}
