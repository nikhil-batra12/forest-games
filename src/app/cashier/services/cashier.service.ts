import { RouteDataSharingService } from './../../core/services/route-data-sharing.service';
import { NotificationService } from './../../core/services/notification.service';
import { OrderCoinsService } from './order-coins.service';
import { AppSettings } from './../../config/app-settings';
import { CommonUtilsService } from './../../core/services/common-utils.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  coins = [];
  private readonly defaultConfig = {
    url: '',
    params: {},
    headers: {},
    getCompleteResponse: false,
    data: ''
  };

  constructor(
    private commonUtils: CommonUtilsService,
    private route: Router,
    private orderCoinsService: OrderCoinsService,
    private routeDataSharingService: RouteDataSharingService,
    private notificationService: NotificationService
  ) { }

  getPackageCoins() {
    const params = {};
    let config = {
      url: AppSettings.apiEndpoints.coins.fetchCoins,
      params
    };
    config = Object.assign({}, this.defaultConfig, config);
    return this.commonUtils.getRequest(config).pipe(
      map(response => {
        this.coins = response.data.coins;
        return this.coins;
      })
    );
  }

  getPaymentOptions() {
    const params = {};
    let config = {
      url: AppSettings.apiEndpoints.paymentMethod.fetchPaymentMethods,
      params
    };
    config = Object.assign({}, this.defaultConfig, config);
    return this.commonUtils.getRequest(config);
  }

  makePayment(data) {
    return Observable.create((observer) => {
      this.postProceedToPayment(data).subscribe(response => {
        this.orderCoinsService.clearPreviousOrder();
        this.routeDataSharingService.setRouteData(
          {
            routeName: 'payment-status',
            routeData: {
              status: 'success',
              response: response.data
            }
          });
          observer.next('success');
          observer.complete();
        this.route.navigate(['cashier', 'payment-status', 'success']);
      }, error => {
        if (error.code === 'INVINP') {
          this.notificationService.displayError({ content: error.data.message });
          observer.next('failure');
        } else {
          this.routeDataSharingService.setRouteData({
            routeName: 'payment-status',
            routeData: {
              status: 'failure',
              response: error.data
            }
          });
          observer.complete();
          this.route.navigate(['cashier', 'payment-status', 'failure']);
        }
      });
    });
  }

  postProceedToPayment(data) {
    const params = {};
    let config = {
      url: AppSettings.apiEndpoints.paymentMethod.makePayment,
      data
    };
    config = Object.assign({}, this.defaultConfig, config);
    return this.commonUtils.postRequest(config);
  }

  populateExpiryInfo() {
    const months = AppSettings.config.bankingCard.months;
    const years = [];
    const currentYear = new Date().getFullYear();
    const maxYear = AppSettings.config.bankingCard.maxYear;
    for (let i = currentYear; i <= maxYear; i++) {
      years.push(String(i));
    }
    return { months, years };
  }
}
