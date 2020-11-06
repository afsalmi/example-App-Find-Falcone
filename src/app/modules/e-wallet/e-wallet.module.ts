import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EWalletRoutingModule } from './e-wallet-routing.module';
import { EWalletComponent } from './e-wallet.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EWalletComponent],
  imports: [
    CommonModule,
    EWalletRoutingModule,
    SharedModule
  ]
})
export class EWalletModule { }
