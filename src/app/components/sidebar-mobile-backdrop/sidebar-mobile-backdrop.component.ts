import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'sidebar-mobile-backdrop',
  templateUrl: './sidebar-mobile-backdrop.component.html',
  host: {
  	class: 'app-sidebar-mobile-backdrop'
  }
})

export class SidebarMobileBackdropComponent {
	@HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
  	event.preventDefault();
		
		var elm = document.getElementById('app');
		if (elm) {
			elm.classList.toggle('app-sidebar-mobile-toggled');
		}
  }
}
