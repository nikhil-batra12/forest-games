import { CashierResolver } from './cashier/cashier-resolver.service';
// import { ServerErrorComponent } from './standalone/server-error/server-error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AppResolver } from './app-resolver.service';

const routes: Routes = [
  {path: '', redirectTo: 'cashier', pathMatch: 'full'},
  { path: 'cashier', loadChildren: './cashier/cashier.module#CashierModule', resolve: { coinsData: CashierResolver } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
