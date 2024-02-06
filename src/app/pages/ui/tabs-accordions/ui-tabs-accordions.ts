import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ui-tabs-accordions',
  templateUrl: './ui-tabs-accordions.html'
})

export class UiTabsAccordionsPage {
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;

	constructor(private http: HttpClient) { }
	
	ngOnInit() {
    this.http.get('assets/data/ui-tabs-accordions/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/ui-tabs-accordions/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/ui-tabs-accordions/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/ui-tabs-accordions/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/ui-tabs-accordions/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
  }
}
