import { Component, OnInit, ElementRef, Renderer2, OnDestroy, HostListener, ViewContainerRef } from '@angular/core';
import { ConstantService } from '../../structure/constants/constant.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'ng5-breadcrumb';

declare var $: any;
declare var swal: any;
declare var NProgress: any;

@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.component.html',
  styleUrls: ['./e-wallet.component.css']
})
export class EWalletComponent implements OnInit {
  public currentPageName = null;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    public constantService: ConstantService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
  ) {

   }

   ngOnInit() {
    this.init();
  }

  
  ngOnDestroy() {

  }

  init() {
    this.currentPageName = 'E-Wallet';
    this.breadcrumbService.addFriendlyNameForRouteRegex('\\/ewallet(\\?.*)?$', this.currentPageName);
  }

}
