import { NotificationService } from './../../../../core/services/notification.service';
import { FormGroup, Validators } from '@angular/forms';
import { OrderCoinsService } from './../../../services/order-coins.service';
import { CashierService } from './../../../services/cashier.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-net-banking',
  templateUrl: './net-banking.component.html',
  styleUrls: ['./net-banking.component.css']
})
export class NetBankingComponent implements OnInit {
  banks = [];
  popularBanks = [];
  netBankingForm: FormGroup;
  bankCode;
  showLoader = true;
  constructor(
    private cashierService: CashierService,
    private orderCoinsService: OrderCoinsService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createForm();
    this.cashierService.getPaymentOptions().subscribe(response => {
      this.banks = response.data.banks;
      this.popularBanks = this.banks.filter(bank => bank.isPopular);
      this.showLoader = false;
    });
  }

  proceedToPayment() {
    this.showLoader = true;
    this.notificationService.removeMessage();
    if (this.netBankingForm.valid) {
      const reqObj = {
        paymentMode: 'NETBANKING',
        details: Object.assign({}, { bankCode: this.bankCode }, this.netBankingForm.value)
      };
      this.orderCoinsService.setPayment(reqObj);
      this.cashierService.makePayment(this.orderCoinsService.orderRequestObj).subscribe(response => {
        if (response === 'failure') {
          this.showLoader = false;
        }
      });
    } else {
      this.notificationService.displayInfo({ content: 'Please enter valid bank details.' });
      this.showLoader = false;
    }
  }

  createForm() {
    this.netBankingForm = this.fb.group({
      accountId: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{10}')]],
      routingId: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}')]]
    });
  }

}
