import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'layout-mixed-nav',
  templateUrl: './layout-mixed-nav.html'
})

export class LayoutMixedNavPage {
	code1: any;

	constructor(private appSettings: AppSettings, private http: HttpClient) { }
	
	ngOnInit() {
    this.appSettings.appTopNav = true;
    
    this.http.get('assets/data/layout-mixed-nav/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
  }

  ngOnDestroy() {
    this.appSettings.appTopNav = false;
  }
}
