import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ui-buttons',
  templateUrl: './ui-buttons.html'
})

export class UiButtonsPage {
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;
	code6: any;
	code7: any;
	code8: any;
	
	constructor(private http: HttpClient) { }
	
	ngOnInit() {
    this.http.get('assets/data/ui-buttons/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/ui-buttons/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/ui-buttons/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/ui-buttons/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/ui-buttons/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
    this.http.get('assets/data/ui-buttons/code-6.json', { responseType: 'text' }).subscribe(data => {
    	this.code6 = data;
		});
    this.http.get('assets/data/ui-buttons/code-7.json', { responseType: 'text' }).subscribe(data => {
    	this.code7 = data;
		});
    this.http.get('assets/data/ui-buttons/code-8.json', { responseType: 'text' }).subscribe(data => {
    	this.code8 = data;
		});
  }
}
