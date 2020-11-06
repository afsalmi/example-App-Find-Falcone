import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'protected', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent,
    data: { title: 'HOME' }
  },
  {
    path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { title: 'Dashboard' }
  },
  {
    path: 'ewallet', loadChildren: () => import('./modules/e-wallet/e-wallet.module').then(m => m.EWalletModule),
    data: { title: 'E-Wallet' }
  },
  {
    path: '**', component: HomeComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
