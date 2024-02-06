import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettings {
	public appMode: string = 'dark';
	public appTheme: string = '';
	public appCover: string = '';
	
	public appBoxedLayout: boolean = false;
  public appHeaderNone: boolean = false;
  public appTopNav: boolean = false;
  public appFooter: boolean = false;
  
  public appSidebarNone: boolean = false;
  public appSidebarCollapsed: boolean = false;
  
  public appContentClass: string = '';
  public appContentFullHeight: boolean = false;
  public appContentFullWidth: boolean = false;
}