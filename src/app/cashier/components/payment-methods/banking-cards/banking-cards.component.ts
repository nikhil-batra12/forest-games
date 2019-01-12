import { NotificationService } from './../../../../core/services/notification.service';
import { OrderCoinsService } from './../../../services/order-coins.service';
import { CashierService } from './../../../services/cashier.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-banking-cards',
  templateUrl: './banking-cards.component.html',
  styleUrls: ['./banking-cards.component.css']
})
export class BankingCardsComponent implements OnInit {
  @Input('cardType') cardType;
  newCardForm: FormGroup;
  months = [];
  years = [];
  showLoader = true;
  constructor(
    private cashierService: CashierService,
    private fb: FormBuilder,
    private orderCoinsService: OrderCoinsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    const expiry = this.cashierService.populateExpiryInfo();
    this.months = expiry.months;
    this.years = expiry.years;
    this.createForm();
    this.showLoader = false;
  }

  proceedToPayment() {
    this.showLoader = true;
    this.notificationService.removeMessage();
    if (this.newCardForm.valid) {
      const reqObj = {
        paymentMode: this.cardType,
        details: Object.assign({}, this.newCardForm.value)
      };
      this.orderCoinsService.setPayment(reqObj);
      this.cashierService.makePayment(this.orderCoinsService.orderRequestObj).subscribe(response => {
        if (response === 'failure') {
          this.showLoader = false;
        }
      });
    } else {
      this.notificationService.displayInfo({content: 'Please enter valid card details.'});
      this.showLoader = false;
    }
  }

  createForm() {
    this.newCardForm = this.fb.group({
      cardNo: [null, [Validators.required, Validators.pattern('^[0-9]{16}')]],
      expiryMonth: [null, [Validators.required]],
      expiryYear: [null, [Validators.required]],
      cvv: [null, [Validators.required, Validators.pattern('^[0-9]{3}')]]
    });
  }

}
