import { RouteDataSharingService } from './../../../core/services/route-data-sharing.service';
import { BreadCrumbService } from './../../services/bread-crumb.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  paymentData: any = {};
  paymentStatus = '';
  returnState = [];
  constructor(
    private routeDataSharingService: RouteDataSharingService,
    private route: Router,
    private breadCrumbService: BreadCrumbService
  ) { }

  ngOnInit() {
    const routeData = this.routeDataSharingService.getRouteData('payment-status');
    const returnState = this.routeDataSharingService.getRouteData('home');
    this.returnState = returnState ? returnState.url : '';
    if (!routeData) {
      this.route.navigate(['./']);
      return;
    }
    this.paymentData = routeData.response;
    if (!this.paymentData) {
      this.paymentData = {};
      this.paymentData.message = 'Something went wrong. Please try later';
    }
    this.paymentStatus = routeData.status;
    let breadcrumb = this.breadCrumbService.getBreadCrumb();
    breadcrumb = breadcrumb.map(obj => {
      const obj2 = { ...obj, icon: 'fa fa-check', link: null, completed: true };
      return obj2;
    });
    this.breadCrumbService.setBreadCrumb(breadcrumb);
  }

}
