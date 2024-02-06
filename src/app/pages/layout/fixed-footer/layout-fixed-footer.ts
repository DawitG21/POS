import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'layout-fixed-footer',
  templateUrl: './layout-fixed-footer.html'
})

export class LayoutFixedFooterPage {
	code1: any;

	constructor(private appSettings: AppSettings, private http: HttpClient) { }
	
	ngOnInit() {
    this.appSettings.appFooter = true;
    
    this.http.get('assets/data/layout-fixed-footer/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
  }

  ngOnDestroy() {
    this.appSettings.appFooter = false;
  }
}
