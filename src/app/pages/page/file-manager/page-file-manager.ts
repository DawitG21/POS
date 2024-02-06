import { Component } from '@angular/core';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
  selector: 'page-file-manager',
  templateUrl: './page-file-manager.html',
  host: {
  	'class': 'd-flex flex-column h-100'
  }
})

export class FileManagerPage {
	mobileSidebarToggled: boolean = false;
	
	toggleMobileSidebar(): void {
		this.mobileSidebarToggled = !this.mobileSidebarToggled;
	}
	
	constructor(private appSettings: AppSettings) { }
	
	ngOnInit() {
    this.appSettings.appContentFullHeight = true;
    
    var fileHasSubNodes = document.querySelectorAll(".file-node.has-sub");
		fileHasSubNodes.forEach(node => {
			var fileArrow = node.querySelector(".file-link > .file-arrow");
			if (fileArrow) {
				fileArrow.addEventListener("click", function (event) {
					event.preventDefault();
					node.classList.toggle("expand");
				});
			}
		});
	
		var fileInfoNodes = document.querySelectorAll(".file-node");
		fileInfoNodes.forEach(node => {
			var fileInfo = node.querySelector(".file-link > .file-info");
			if (fileInfo) {
				fileInfo.addEventListener("click", function (event) {
					event.preventDefault();
					fileInfoNodes.forEach(otherNode => {
						if (otherNode !== node) {
							otherNode.classList.remove("selected");
						}
					});
					node.classList.add("expand");
					node.classList.add("selected");
				});
			}
		});
  }
  
  ngOnDestroy() {
    this.appSettings.appContentFullHeight = false;
  }
}
