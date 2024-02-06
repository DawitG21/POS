import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'pos-counter-checkout',
  templateUrl: './pos-counter-checkout.html'
})

export class PosCounterCheckoutPage {
	tables: any = '';
	selectedTable: any = '';
	mobileSidebarToggled: boolean = false;
	
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
  
  getTotalPrice(orders: any) {
		var total = 0;
		for (var i = 0; i < orders.length; i++) {
			total += parseFloat(orders[i].price);
		}
		return total.toFixed(2);
	}
	
	toggleTable(event: MouseEvent, table: any) {
		event.preventDefault();
		
		this.toggleMobileSidebar();
		
		if (table.selected) {
			this.selectedTable = '';
			
			for (var i = 0; i < this.tables.length; i++) {
				this.tables[i].selected = false;
			}
		} else {
			this.selectedTable = table;
			
			for (var i = 0; i < this.tables.length; i++) {
				this.tables[i].selected = (this.tables[i].id == table.id) ? true : false;
			}
		}
	}
	
	getPrice(orders: any, type: any) {
		var price = 0;
		
		if (orders) {
			for (var i = 0; i < orders.length; i++) {
				if (type == 'subtotal') {
					price += parseFloat(orders[i].price);
				} else if (type == 'taxes') {
					price += parseFloat(orders[i].price) * 0.06;
				} else if (type == 'total') {
					price += parseFloat(orders[i].price);
					price += parseFloat(orders[i].price) * 0.06
				}
			}
		}
		
		return price.toFixed(2);
	}
	
	toggleMobileSidebar() {
		this.mobileSidebarToggled = !this.mobileSidebarToggled;
		
		if (!this.mobileSidebarToggled) {
			this.selectedTable = '';
			
			for (var i = 0; i < this.tables.length; i++) {
				this.tables[i].selected = false;
			}
		}
	}
	
	ngOnInit() {
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
    this.appSettings.appContentFullHeight = true;
    
    this.http.get('assets/data/pos-counter-checkout/data.json', { responseType: 'json' }).subscribe((response) => {
			this.tables = response;
		});
  }

  ngOnDestroy() {
    this.appSettings.appHeaderNone = false;
    this.appSettings.appSidebarNone = false;
    this.appSettings.appContentClass = '';
    this.appSettings.appContentFullHeight = false;
  }
}
