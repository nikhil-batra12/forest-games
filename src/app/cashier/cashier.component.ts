import { Component, OnInit } from '@angular/core';
import { CashierService } from 'src/app/cashier/services/cashier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit, AfterViewInit {
  coinsData = [];
  constructor(
    private cashierService: CashierService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.coinsData = this.route.snapshot.data.coinsData;
  }

  ngAfterViewInit() {
    this.router.navigate(['cashier', 'payment-package', this.coinsData[0].id]);
  }
}
