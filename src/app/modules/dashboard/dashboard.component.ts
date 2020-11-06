import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../structure/constants/constant.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';

declare var $: any;
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public currentPageName = null;
  public destination1 = [];
  public destination2 = [];
  public destination3 = [];
  public destination4 = [];

  public destination1List = [];
  public destination2List = [];
  public destination3List = [];
  public destination4List = [];

  public falconeForm: FormGroup;


  public singleDropdownSettings = {
    singleSelection: true,
    text: 'Select Planet',
    enableSearchFilter: true,
  };
  public radio1Selected: any;
  public radio2Selected: any;
  public radio3Selected: any;
  public radio4Selected: any;

  public planetList = [];
  public vehicleList = [];

  public result1List = [];
  public result2List = [];
  public result3List = [];
  public result4List = [];

  constructor(
    private http: HttpClient,
    private constantService: ConstantService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.falconeForm = new FormGroup({
      destination1: new FormControl('', Validators.required),
      destination2: new FormControl('', Validators.required),
      destination3: new FormControl('', Validators.required),
      destination4: new FormControl('', Validators.required),
      radio1Selected: new FormControl('', Validators.required),
      radio2Selected: new FormControl('', Validators.required),
      radio3Selected: new FormControl('', Validators.required),
      radio4Selected: new FormControl('', Validators.required)
    });
    this.init();
  }


  ngOnDestroy() {

  }

  init() {
    this.currentPageName = 'Finding Falcone';
    this.breadcrumbService.addFriendlyNameForRouteRegex('\\/dashboard(\\?.*)?$', this.currentPageName);
    this.getPlanetList(() => {
      this.getVehicleList(() => {
        this.getDestination1(() => {

        });
      });
    });
  }

  get(url) {
    let headers = new HttpHeaders();
    // headers = headers.set('Cache-Control', 'no-cache');
    // headers = headers.set('Pragma', 'no-cache');
    // headers = headers.set('Expires', '-1');
    return this.http.get(url, {
      headers: headers
    }).map(res => res)
      .catch((error: any) => {
        console.log('error=======================>>>>', error);
        return Observable.throw(new Error(error.status));
      });
  }

  getPlanetList(callback: () => void) {
    this.planetList = [];
    const res = this.get(environment.apiUrl + '/planets');
    res.subscribe(result => {
      console.log('================>>>>', result)
      $.each(result, (key, val) => {
        this.planetList.push(val);
      });
      if (callback) {
        callback();
      }
    });
  }

  getVehicleList(callback: () => void) {
    this.vehicleList = [];
    const res = this.get(environment.apiUrl + '/vehicles');
    res.subscribe(result => {
      console.log('================>>>>', result)
      $.each(result, (key, val) => {
        this.vehicleList.push(val);
      });
      if (callback) {
        callback();
      }
    });
  }

  getDestination1(callback) {
    this.destination1List = [];
    $.each(this.planetList, (key, val) => {
      const obj = {
        id: val.name,
        itemName: val.name,
        distance: val.distance
      }
      this.destination1List.push(obj);
    });
    console.log(this.destination1List)
    if (callback) {
      callback();
    }
  }

  getDestination1Result(callback) {

    this.result1List = [];
    $.each(this.vehicleList, (key, val) => {
      const obj = {
        id: val.name,
        name: val.name,
        totalNo: val.total_no,
        balanceNo: val.total_no,
        maxDistance: val.max_distance,
        speed: val.speed
      }
      this.result1List.push(obj);
    });
    console.log(this.result1List)
    if (callback) {
      callback();
    }
  }

  getDestination2Result(callback) {

    this.result2List = [];
    $.each(this.vehicleList, (key, val) => {
      const obj = {
        id: val.name,
        name: val.name,
        totalNo: val.total_no,
        balanceNo: val.total_no,
        maxDistance: val.max_distance,
        speed: val.speed
      }
      this.result2List.push(obj);
    });
    console.log(this.result2List)
    if (callback) {
      callback();
    }
  }

  getDestination3Result(callback) {

    this.result3List = [];
    $.each(this.vehicleList, (key, val) => {
      const obj = {
        id: val.name,
        name: val.name,
        totalNo: val.total_no,
        balanceNo: val.total_no,
        maxDistance: val.max_distance,
        speed: val.speed
      }
      this.result3List.push(obj);
    });
    console.log(this.result3List)
    if (callback) {
      callback();
    }
  }

  getDestination4Result(callback) {

    this.result4List = [];
    $.each(this.vehicleList, (key, val) => {
      const obj = {
        id: val.name,
        name: val.name,
        totalNo: val.total_no,
        balanceNo: val.total_no,
        maxDistance: val.max_distance,
        speed: val.speed
      }
      this.result4List.push(obj);
    });
    console.log(this.result4List)
    if (callback) {
      callback();
    }
  }

  containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === obj.id) {
        return true;
      }
    }
    return false;
  }

  onChangeDestination1(item: any) {
    if (!this.containsObject(item, this.destination1)) {
      this.destination1.push(item);
    }

    this.getDestination1Result(() => {
      if (this.destination2.length) {
        if (this.destination1[0].itemName === this.destination2[0].itemName) {
          this.falconeForm.patchValue({
            destination2: []
          });
          this.result2List = [];

          this.getDestination2Result(() => {
          });
        } else {
          this.getDestination2Result(() => {
            if (this.destination3.length) {
              if (this.destination1[0].itemName === this.destination3[0].itemName ||
                this.destination2[0].itemName === this.destination3[0].itemName) {
                this.falconeForm.patchValue({
                  destination3: []
                });
                this.result3List = [];

                this.getDestination3Result(() => {
                });
              } else {
                this.getDestination3Result(() => {
                  if (this.destination4.length) {
                    if (this.destination1[0].itemName === this.destination4[0].itemName ||
                      this.destination2[0].itemName === this.destination4[0].itemName ||
                      this.destination3[0].itemName === this.destination4[0].itemName) {
                      this.falconeForm.patchValue({
                        destination4: []
                      });
                      this.result4List = [];

                      this.getDestination4Result(() => {
                      });
                    } else {
                      this.getDestination4Result(() => {

                      });
                    }

                  }
                });
              }
            }
          });
        }
      }
    });
  }

  onChangeDestination2(item: any) {
    if (!this.containsObject(item, this.destination2)) {
      this.destination2.push(item);
    }
    this.getDestination2Result(() => {
      if (this.destination3.length) {
        if (this.destination1[0].itemName === this.destination3[0].itemName ||
          this.destination2[0].itemName === this.destination3[0].itemName) {
          this.falconeForm.patchValue({
            destination3: []
          });
          this.result3List = [];

          this.getDestination3Result(() => {
          });
        } else {
          this.getDestination3Result(() => {
            if (this.destination4.length) {
              if (this.destination1[0].itemName === this.destination4[0].itemName ||
                this.destination2[0].itemName === this.destination4[0].itemName ||
                this.destination3[0].itemName === this.destination4[0].itemName) {
                this.falconeForm.patchValue({
                  destination4: []
                });
                this.result4List = [];

                this.getDestination4Result(() => {
                });
              } else {
                this.getDestination4Result(() => {

                });
              }

            }
          });
        }
      }
    });
  }

  onChangeDestination3(item: any) {
    if (!this.containsObject(item, this.destination3)) {
      this.destination3.push(item);
    }
    this.getDestination3Result(() => {
      if (this.destination4.length) {
        this.getDestination4Result(() => {

        });
      }
    });
  }

  onChangeDestination4(item: any) {
    if (!this.containsObject(item, this.destination4)) {
      this.destination4.push(item);
    }
    this.getDestination4Result(() => {

    });
  }

  setRadio1Selection() {
    console.log(this.falconeForm.get('radio1Selected').value);

    if (this.falconeForm.get('radio1Selected').value) {
      console.log(this.falconeForm.get('radio1Selected').value);
      this.getDestination2(() => {

      });
    }
  }

  getDestination2(callback) {
    this.destination2List = [];
    $.each(this.planetList, (key, val) => {
      const obj = {
        id: val.name,
        itemName: val.name,
        distance: val.distance
      }
      if (!this.destination1.length || (this.destination1.length && this.destination1[0].itemName !== val.name)) {
        this.destination2List.push(obj);
      }
    });
    console.log(this.destination2List)
    if (callback) {
      callback();
    }
  }


  setRadio2Selection() {
    if (this.falconeForm.get('radio2Selected').value) {
      console.log(this.falconeForm.get('radio2Selected').value);
      this.getDestination3(() => {

      });
    }
  }

  getDestination3(callback) {
    this.destination3List = [];
    $.each(this.planetList, (key, val) => {
      const obj = {
        id: val.name,
        itemName: val.name,
        distance: val.distance
      }
      if (this.destination1.length && this.destination1[0].itemName !== val.name &&
        this.destination2.length && this.destination2[0].itemName !== val.name) {
        this.destination3List.push(obj);
      }
    });
    console.log(this.destination3List)
    if (callback) {
      callback();
    }
  }

  setRadio3Selection() {
    if (this.falconeForm.get('radio3Selected').value) {
      console.log(this.falconeForm.get('radio3Selected').value);
      this.getDestination4(() => {

      });
    }
  }

  getDestination4(callback) {
    this.destination4List = [];
    $.each(this.planetList, (key, val) => {
      const obj = {
        id: val.name,
        itemName: val.name,
        distance: val.distance
      }
      if (this.destination1.length && this.destination1[0].itemName !== val.name &&
        this.destination2.length && this.destination2[0].itemName !== val.name &&
        this.destination3.length && this.destination3[0].itemName !== val.name) {
        this.destination4List.push(obj);
      }
    });
    console.log(this.destination4List)
    if (callback) {
      callback();
    }
  }
  setRadio4Selection() {
    if (this.falconeForm.get('radio4Selected').value) {
      console.log(this.falconeForm.get('radio4Selected').value);

    }
  }

  radio1SelectedCount(obj) {
    return this.falconeForm.get('radio1Selected').value === obj.name ? obj.balanceNo - 1 : obj.balanceNo;
  }

  radio2SelectedCount(obj) {
    let balanceNo = obj.balanceNo;
    if (this.falconeForm.get('radio1Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    if (this.falconeForm.get('radio2Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    return balanceNo;
  }

  radio3SelectedCount(obj) {
    let balanceNo = obj.balanceNo;
    if (this.falconeForm.get('radio1Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    if (this.falconeForm.get('radio2Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    if (this.falconeForm.get('radio3Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    return balanceNo;
  }

  radio4SelectedCount(obj) {
    let balanceNo = obj.balanceNo;
    if (this.falconeForm.get('radio1Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    if (this.falconeForm.get('radio2Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    if (this.falconeForm.get('radio3Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    if (this.falconeForm.get('radio4Selected').value === obj.name) {
      balanceNo = balanceNo - 1;
    }
    return balanceNo;
  }

  calculateTimetaken() {
    let totalTime = 0;
    if (this.destination1.length && this.falconeForm.get('radio1Selected').value) {
      const itemList = this.vehicleList
        .filter((item, index) => index < this.vehicleList.length)
        .filter((item, index) => item['name'] === this.falconeForm.get('radio1Selected').value);
      if (itemList.length) {
        const speed = itemList[0].speed;
        totalTime += (this.destination1[0].distance / speed);
      }
    }

    if (this.destination2.length && this.falconeForm.get('radio2Selected').value) {
      const itemList = this.vehicleList
        .filter((item, index) => index < this.vehicleList.length)
        .filter((item, index) => item['name'] === this.falconeForm.get('radio2Selected').value);
      if (itemList.length) {
        const speed = itemList[0].speed;
        totalTime += (this.destination2[0].distance / speed);
      }
    }

    if (this.destination3.length && this.falconeForm.get('radio3Selected').value) {
      const itemList = this.vehicleList
        .filter((item, index) => index < this.vehicleList.length)
        .filter((item, index) => item['name'] === this.falconeForm.get('radio3Selected').value);
      if (itemList.length) {
        const speed = itemList[0].speed;
        totalTime += (this.destination3[0].distance / speed);
      }
    }

    if (this.destination4.length && this.falconeForm.get('radio4Selected').value) {
      const itemList = this.vehicleList
        .filter((item, index) => index < this.vehicleList.length)
        .filter((item, index) => item['name'] === this.falconeForm.get('radio4Selected').value);
      if (itemList.length) {
        const speed = itemList[0].speed;
        totalTime += (this.destination4[0].distance / speed);
      }
    }
    return totalTime;

  }
  findFalconeSubmit(submitBtn) {
    console.log("****************")
    // submitBtn.disabled = true;
    const destination1 = this.falconeForm.get('destination1').value;
    const destination2 = this.falconeForm.get('destination2').value;
    const destination3 = this.falconeForm.get('destination3').value;
    const destination4 = this.falconeForm.get('destination4').value;

    const inputData = {

    };
    const authenticationHeader1 = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.sendPostRequest(environment.apiUrl + '/token', inputData, authenticationHeader1, (data) => {
      console.log('response data====>', data);
      if (data) {
        const authenticationHeader2 = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        const inputData2 = {
          token: data.token,
          planet_names: [
            destination1[0].itemName,
            destination2[0].itemName,
            destination3[0].itemName,
            destination4[0].itemName
          ],
          vehicle_names: [
            this.falconeForm.get('radio1Selected').value,
            this.falconeForm.get('radio2Selected').value,
            this.falconeForm.get('radio3Selected').value,
            this.falconeForm.get('radio4Selected').value
          ]
        }
        this.sendPostRequest(environment.apiUrl + '/find', inputData2, authenticationHeader2, (data2) => {
          console.log('response data2====>', data2);
          const totalTime = this.calculateTimetaken();
          if (data2 && data2.status) {
            swal({
              title: 'Success ! \n Congratulations on finding Falcone King Shan is mighty pleased',
              text: 'Time taken : ' + totalTime,
              type: 'success',
              confirmButtonClass: 'btn-success pointer'
            });
          } else {
            swal({
              title: 'Failed on finding Falcone!',
              text: 'Time taken : ' + totalTime,
              type: 'warning',
              confirmButtonClass: 'btn-warning pointer'
            });
          }

        })
      }
    })

  }

  sendPostRequest(url, inputData, header, callback) {
    this.http
      .post(url, inputData, { headers: header })
      .subscribe(data => {
        console.log('data====>', data);
        callback(data);
      }, error => {
        console.log('error====>', error);
        callback(null);
      });
  }

  reset() {
    this.destination2List = [];
    this.destination3List = [];
    this.destination4List = [];

    this.result1List = [];
    this.result2List = [];
    this.result3List = [];
    this.result4List = [];

    this.falconeForm.reset();
    this.destination1 = [];
    this.destination2 = [];
    this.destination3 = [];
    this.destination4 = [];
  }
}
