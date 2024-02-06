import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'form-elements',
  templateUrl: './form-elements.html'
})

export class FormElementsPage {
	code1: any;
	code2: any;
	code3: any;
	code4: any;
	code5: any;
	code6: any;
	code7: any;
	code8: any;
	code9: any;
	code10: any;
	code11: any;
	code12: any;
	code13: any;
	code14: any;

	constructor(private http: HttpClient) { }
	
	ngOnInit() {
    this.http.get('assets/data/form-elements/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/form-elements/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/form-elements/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
    this.http.get('assets/data/form-elements/code-4.json', { responseType: 'text' }).subscribe(data => {
    	this.code4 = data;
		});
    this.http.get('assets/data/form-elements/code-5.json', { responseType: 'text' }).subscribe(data => {
    	this.code5 = data;
		});
    this.http.get('assets/data/form-elements/code-6.json', { responseType: 'text' }).subscribe(data => {
    	this.code6 = data;
		});
    this.http.get('assets/data/form-elements/code-7.json', { responseType: 'text' }).subscribe(data => {
    	this.code7 = data;
		});
    this.http.get('assets/data/form-elements/code-8.json', { responseType: 'text' }).subscribe(data => {
    	this.code8 = data;
		});
    this.http.get('assets/data/form-elements/code-9.json', { responseType: 'text' }).subscribe(data => {
    	this.code9 = data;
		});
    this.http.get('assets/data/form-elements/code-10.json', { responseType: 'text' }).subscribe(data => {
    	this.code10 = data;
		});
    this.http.get('assets/data/form-elements/code-11.json', { responseType: 'text' }).subscribe(data => {
    	this.code11 = data;
		});
    this.http.get('assets/data/form-elements/code-12.json', { responseType: 'text' }).subscribe(data => {
    	this.code12 = data;
		});
    this.http.get('assets/data/form-elements/code-13.json', { responseType: 'text' }).subscribe(data => {
    	this.code13 = data;
		});
    this.http.get('assets/data/form-elements/code-14.json', { responseType: 'text' }).subscribe(data => {
    	this.code14 = data;
		});
  }
}
