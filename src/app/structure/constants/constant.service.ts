import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  HOME_URL: string;
  DASHBOARD_URL: string;
  EWALLET_URL: string;

  DEV_ENV: string;
  PROD_ENV: string;

  SITE_COPYRIGHT_MESSAGE: string;

  constructor() {

    this.HOME_URL = '/home';
    this.DASHBOARD_URL = '/dashboard';
    this.EWALLET_URL = '/ewallet';

    this.DEV_ENV = 'dev';
    this.PROD_ENV = 'prod';

    this.SITE_COPYRIGHT_MESSAGE = 'Copyright: Example All rights reserved.';
  }

}
