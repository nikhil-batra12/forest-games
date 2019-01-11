import { CashierRoutingModule } from './cashier-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPackageComponent } from './components/payment-package/payment-package.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { CashierComponent } from './cashier.component';
import { NetBankingComponent } from './components/payment-methods/net-banking/net-banking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankingCardsComponent } from './components/payment-methods/banking-cards/banking-cards.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    CashierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    PaymentPackageComponent,
    PaymentMethodsComponent,
    CashierComponent,
    NetBankingComponent,
    BankingCardsComponent,
    BreadCrumbComponent,
    PaymentStatusComponent
  ]
})
export class CashierModule { }
