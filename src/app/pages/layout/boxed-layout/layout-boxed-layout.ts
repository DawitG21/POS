import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'layout-boxed-layout',
  templateUrl: './layout-boxed-layout.html'
})

export class LayoutBoxedLayoutPage {
	code1: any;

	constructor(private appSettings: AppSettings, private http: HttpClient) { }
	
	ngOnInit() {
    this.appSettings.appBoxedLayout = true;
    
    this.http.get('assets/data/layout-boxed-layout/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
  }

  ngOnDestroy() {
    this.appSettings.appBoxedLayout = false;
  }
}
