import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'pos-menu-stock',
  templateUrl: './pos-menu-stock.html'
})

export class PosMenuStockPage {
	menu: any;

	constructor(private appSettings: AppSettings, private http: HttpClient) { }
	
	checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

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
	
	ngOnInit() {
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
    this.appSettings.appContentFullHeight = true;
    
    this.http.get('assets/data/pos-menu-stock/data.json', { responseType: 'json' }).subscribe((response) => {
			this.menu = response;
		});
  }

  ngOnDestroy() {
    this.appSettings.appHeaderNone = false;
    this.appSettings.appSidebarNone = false;
    this.appSettings.appContentClass = '';
    this.appSettings.appContentFullHeight = false;
  }
}
