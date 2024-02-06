import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'layout-collapsed-sidebar',
  templateUrl: './layout-collapsed-sidebar.html'
})

export class LayoutCollapsedSidebarPage {
	code1: any;

	constructor(private appSettings: AppSettings, private http: HttpClient) { }
	
	ngOnInit() {
    this.appSettings.appSidebarCollapsed = true;
    
    this.http.get('assets/data/layout-collapsed-sidebar/code-1.json', { responseType: 'text' }).subscribe(data => {
    	this.code1 = data;
		});
  }

  ngOnDestroy() {
    this.appSettings.appSidebarCollapsed = false;
  }
}
