import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  providers: [Ng5BreadcrumbModule]
})

export class TopBarComponent {
  isAuthenticated = false;
  public userName;
  constructor(
  ) {
  }


  ngOnInit() {
    console.log("topbar.............");
    this.userName = 'Afsal';
  }

  logout() {

  }
}
