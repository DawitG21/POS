import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'form-wizards',
  templateUrl: './form-wizards.html'
})

export class FormWizardsPage {
	code1: any;
	code2: any;
	code3: any;

	constructor(private http: HttpClient) { }
	
	ngOnInit() {
    this.http.get('assets/data/form-wizards/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
    this.http.get('assets/data/form-wizards/code-2.json', { responseType: 'text' }).subscribe(data => {
    	this.code2 = data;
		});
    this.http.get('assets/data/form-wizards/code-3.json', { responseType: 'text' }).subscribe(data => {
    	this.code3 = data;
		});
  }
}
