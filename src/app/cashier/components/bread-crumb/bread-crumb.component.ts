import { OrderCoinsService } from './../../services/order-coins.service';
import { BreadCrumbService } from './../../services/bread-crumb.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  private breadCrumbsSubscription: Subscription;
  amount;
  breadCrumbs = [];
  allStepsCompleted = false;
  constructor(
    private breadCrumbService: BreadCrumbService,
    private orderCoinsService: OrderCoinsService
  ) { }

  ngOnInit() {
    this.breadCrumbsSubscription = this.breadCrumbService.crumb$.subscribe((breadCrumbs) => {
      this.allStepsCompleted = false;
      let completedCounter = 0;
      this.breadCrumbs = breadCrumbs;
      this.breadCrumbs.map(breadcrumb => {
        if (breadcrumb.completed) {
          completedCounter++;
        }
      });
      if (completedCounter === this.breadCrumbs.length) {
        this.allStepsCompleted = true;
      }

      this.amount = this.orderCoinsService.getOrderKey('amount');
    });
  }

}
