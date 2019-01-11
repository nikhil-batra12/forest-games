import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentPackageComponent } from './components/payment-package/payment-package.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { CashierComponent } from './cashier.component';
import { PaymentStatusComponent } from 'src/app/cashier/components/payment-status/payment-status.component';

const routes: Routes = [{
    path: '', component: CashierComponent, children: [
        { path: 'payment-package/:coinid', component: PaymentPackageComponent },
        { path: 'payment-methods', component: PaymentMethodsComponent },
        { path: 'payment-status/:status', component: PaymentStatusComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CashierRoutingModule { }
