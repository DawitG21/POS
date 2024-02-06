import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSettings } from '../../../service/app-settings.service';
import { RestaurantTableService } from '../../restaurant-table/restaurant-table.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../service/message.service';
import { ToastService } from '../../../service/toast.service';
import { firstValueFrom } from 'rxjs';
import { RestaurantTable } from '../../../models/restaurant-table/restaurant-table.model';
import { SearchResult } from '../../../interfaces/search-result';
import { KeyService } from '../../../service/key.service';
import { StorageService } from '../../../service/storage.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit, OnDestroy {


  tables!: RestaurantTable[];
  companyId!: string;

  busy: boolean = true;
  constructor(
    private appSettings: AppSettings,
    private restaurantTableService: RestaurantTableService,
    public router: Router,
    private messageService: MessageService,
    private keyService: KeyService,
    private storageService: StorageService,
    private toastService: ToastService,
    private authService: AuthService
  ) { }


  getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var a;
    m = this.checkTime(m);
    s = this.checkTime(s);
    a = (h > 11) ? 'pm' : 'am';
    h = (h > 12) ? h - 12 : h;

    setTimeout(() => this.getTime(), 500);

    return h + ":" + m + a;
  }

  checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  public getRestaurantTables(): Promise<any> {
    this.busy = true;
    return firstValueFrom(this.restaurantTableService.getRestaurantTablesByCompany(1, 200, this.companyId));
  }



  get() {
    this.getRestaurantTables().then((result: SearchResult) => {
      if (this.tables?.length === 0) {
        this.tables = result.data.sort();
        this.tables = this.tables.filter((table) => table.status === 0);
        // this.pages = Array.from({ length: result.pages }, (_, index) => index + 1);

      } else {
        this.tables = [];
        this.tables = result.data;
        this.tables = this.tables.filter((table) => table.status === 0);

        // this.pages = Array.from({ length: result.pages }, (_, index) => index + 1);
      }
    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    })
      .catch((error) => {
        this.toastService.error(this.messageService.serverError);
      })
      .finally(() => {
        this.busy = false;
      });
  }

  moveToCustomerOrder(event: MouseEvent, table: RestaurantTable) {
    event.preventDefault();
    this.storageService.setData(this.keyService.RESTAURANT_TABLE_KEY, table);
    this.router.navigate(["/pos/customer-order"]);
  }



  ngOnInit() {
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.companyId = this.authService.getCompanyId;
    this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
    this.appSettings.appContentFullHeight = true;
    this.get();

  }

  ngOnDestroy() {
    this.appSettings.appHeaderNone = false;
    this.appSettings.appSidebarNone = false;
    this.appSettings.appContentClass = '';
    this.appSettings.appContentFullHeight = false;
  }
}
