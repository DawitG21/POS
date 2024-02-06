import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { NgForm }    from '@angular/forms';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'page-register',
  templateUrl: './page-register.html'
})

export class RegisterPage {
  constructor(private router: Router, private appSettings: AppSettings) { }
	
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
  
	formSubmit(f: NgForm) {
    this.router.navigate(['/']);
  }
}
