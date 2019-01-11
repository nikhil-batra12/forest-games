import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from 'src/app/cashier/services/bread-crumb.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  bankPaymentOptions = [];
  paymentMethods: Array<any>;
  activePaymentMethod = 'cc';
  constructor(
    private breadCrumbService: BreadCrumbService
  ) { }

  ngOnInit() {
    this.paymentMethods = [{
      name: 'Credit Card',
      code: 'cc',
      isActive: true
    }, {
      name: 'Debit Card',
      code: 'dc',
      isActive: true
    }, {
      name: 'Net Banking',
      code: 'nb',
      isActive: true
    }, {
      name: 'Wallets',
      code: 'wallet',
      isActive: false
    }, {
      name: 'Cash Card',
      code: 'cac',
      isActive: false
    }];
    let breadcrumb = this.breadCrumbService.getBreadCrumb();
    breadcrumb = breadcrumb.map(obj => {
      const obj2 = { ...obj, icon: 'fa fa-check', completed: true };
      return obj2;
    });
    breadcrumb.push({
      number: '2.',
      value: 'Choose Payment Method',
      icon: 'fa fa-credit-card-alt'
    });
    this.breadCrumbService.setBreadCrumb(breadcrumb);
  }

  changePaymentMethod(methodId) {
    this.activePaymentMethod = methodId;
  }

}
