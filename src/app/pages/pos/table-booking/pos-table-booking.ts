import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';
import { NgbDateStruct, 
         NgbCalendar, 
         NgbDate } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'pos-table-booking',
  templateUrl: './pos-table-booking.html'
})

export class PosTableBookingPage {
	tables: any = '';
	currentHour: any = '';
	modal: any = '';
	modalData: any = '';
	datepickerComponentValue: String = '';

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
  
  getAvailableTable() {
		var count = 0;
		var today = new Date();
		var h = today.getHours();
		var a;
		a = (h > 11) ? 'pm' : 'am';
		h = (h > 12) ? h - 12 : h;
		
		this.currentHour = this.checkTime(h) + ":00" + a;
		
		for (var i = 0; i < this.tables.length; i++) {
			for (var x = 0; x < this.tables[i].reservation.length; x++) {
				if (this.tables[i].reservation[x].time == this.currentHour && !this.tables[i].reservation[x].text) {
					count++;
				}
			}
		}
		return count;
	}
	
	getStatus(time: any, text: any) {
		var time = time.split(':');
		var clock = time[1].split('00');
		var ampm = clock[1];
		var hour = parseInt(time[0]);
		var fullHour = (ampm == 'pm' && hour < 12) ? hour + 12 : hour;
		var today = new Date();
		var currentFullHour = today.getHours();
		var currentHour = (currentFullHour > 12) ? currentFullHour - 12 : currentFullHour;
		
		if (fullHour == currentFullHour && text) {
			return 'in-progress';
		} else if (currentFullHour > fullHour && text) {
			return 'completed';
		} else if (currentFullHour < fullHour && text) {
			return 'upcoming';
		}
		return '';
	}
	
	checkSameHour(time: any) {
		var today = new Date();
		var currentFullHour = today.getHours();
		var currentAmPm = (currentFullHour > 12) ? 'pm' : 'am';
		var hour = (currentFullHour > 12) ? currentFullHour - 12 : currentFullHour;
		var currentHour = (hour < 10) ? '0' + hour : hour;
		var currentTime = currentHour + ':00' + currentAmPm;
		
		if (currentTime == time) {
			return true;
		}
		return false;
	}
	
	checkAvailable(reservation: any) {
		for (var x = 0; x < reservation.length; x++) {
			var time = reservation[x].time.split(':');
			var hour = parseInt(time[0]);
			var today = new Date();
			var currentHour = today.getHours();
					currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
		
			if (currentHour == hour && reservation.text) {
				return true;
			}
		}
		return false;
	}
	
	showBookingModal(event: MouseEvent, table: any) {
		event.preventDefault();
		
		const modalPosBooking = document.getElementById('modalPosBooking');
		if (modalPosBooking) {
			this.modalData = table;
			this.modal = new bootstrap.Modal(modalPosBooking);
			this.modal.show();
		}
	}
	
	submitBooking() {
		for (var i = 0; i < this.tables.length; i++) {
			if (this.tables[i].id == this.modalData.id) {
				this.tables[i] = this.modalData;
			}
		}
		this.modal.hide();
	}
	
	ngOnInit() {
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
    this.appSettings.appContentFullHeight = true;
    
    this.http.get('assets/data/pos-table-booking/data.json', { responseType: 'json' }).subscribe((response) => {
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
