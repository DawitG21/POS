import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'ui-modal-notifications',
  templateUrl: './ui-modal-notifications.html'
})

export class UiModalNotificationsPage {
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;

	constructor(private http: HttpClient) { }
	
	showToast(event: MouseEvent, toastId: any) {
		event.preventDefault();
		
		const elm = document.getElementById(toastId);
		const toast = new bootstrap.Toast(elm);
		toast.show();
	}
	
	ngOnInit() {
    this.http.get('assets/data/ui-modal-notifications/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/ui-modal-notifications/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/ui-modal-notifications/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/ui-modal-notifications/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/ui-modal-notifications/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
  }
}
