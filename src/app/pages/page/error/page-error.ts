import { Component } from '@angular/core';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'page-error',
  templateUrl: './page-error.html'
})

export class ErrorPage {
  constructor(private appSettings: AppSettings) { }
	
	ngOnInit() {
    this.appSettings.appSidebarNone = true;
    this.appSettings.appHeaderNone = true;
    this.appSettings.appContentClass = 'p-0';
  }
  
  ngOnDestroy() {
    this.appSettings.appSidebarNone = false;
    this.appSettings.appHeaderNone = false;
    this.appSettings.appContentClass = '';
  }
}
