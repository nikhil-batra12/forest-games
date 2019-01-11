import { RouteDataSharingService } from './../../../core/services/route-data-sharing.service';
import { NotificationService } from './../../../core/services/notification.service';
import { BreadCrumbService } from './../../services/bread-crumb.service';
import { OrderCoinsService } from './../../services/order-coins.service';
import { Component, OnInit } from '@angular/core';
import { CashierService } from '../../services/cashier.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-package',
  templateUrl: './payment-package.component.html',
  styleUrls: ['./payment-package.component.css']
})
export class PaymentPackageComponent implements OnInit {
  coinsData = [];
  userSelectedCoin = null;
  activatedCoinId = null;
  customAmount = null;
  promocode = null;
  constructor(
    private cashierService: CashierService,
    private orderCoinsService: OrderCoinsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadCrumbService: BreadCrumbService,
    private routeDataSharingService: RouteDataSharingService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.orderCoinsService.clearPreviousOrder();
    this.activatedRoute.params.subscribe(params => {
      this.activatedCoinId = params.coinid;
      this.coinsData = this.cashierService.coins;
      this.coinsData.map(value => {
        if (value.id === this.activatedCoinId) {
          this.userSelectedCoin = value;
        }
      });
      this.breadCrumbService.setBreadCrumb([{
        number: '1.', value: 'Enter Amount',
        icon: 'fa fa-tags',
        link: 'payment-package/' + this.coinsData[0].id
      }]);
    });
  }

  goToPayment() {
    const reqObj = {
      coinId: this.userSelectedCoin.id,
      amount: this.userSelectedCoin.value,
      bonus: this.userSelectedCoin.bonus ? this.userSelectedCoin.bonus : 0,
      promocode: this.promocode
    };
    if (!this.userSelectedCoin) {
      return;
    } else if (this.userSelectedCoin.isCustom) {
      const patt = /^\d+$/;
      reqObj['amount'] = this.customAmount;
      if (!patt.test(this.customAmount)) {
        this.notificationService.displayInfo({content: 'Please enter numerical amount only.'});
        return;
      } else{
        this.notificationService.removeMessage();
      }
    }
    this.orderCoinsService.updateAmount(reqObj);
    this.routeDataSharingService.setRouteData({
      routeName: 'home',
      routeData: { url: '/cashier/payment-package/' + this.userSelectedCoin.id }
    });
    this.breadCrumbService.setBreadCrumb([{
      number: '1.', value: 'Enter Amount',
      icon: 'fa fa-tags',
      link: 'payment-package/' + this.userSelectedCoin.id
    }]);
    this.router.navigate(['cashier', 'payment-methods']);
  }


}
