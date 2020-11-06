import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EWalletComponent } from './e-wallet.component';

const routes: Routes = [{ path: '', component: EWalletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EWalletRoutingModule { }
