import { Component, Input, AfterViewInit, HostListener } from '@angular/core';

declare var bootstrap: any;

@Component({
	selector: 'nav-scroll',
	template: '<nav class="navbar navbar-sticky d-none d-xl-block"><nav class="nav"><ng-content></ng-content></nav></nav>',
})
export class NavScrollComponent implements AfterViewInit {
  @HostListener('click', ['$event', '$event.target'])
  onClick(event: MouseEvent, target: HTMLElement) {
  	event.preventDefault();
  	
  	if (target.classList.contains('nav-link')) {
  		const href = target.getAttribute('href');
  		const targetId = (href) ? href.replace('#', '') : '';
  		if (targetId) {
  			this.scrollToTarget(targetId);
  		}
  	}
  }
  
  scrollToTarget(targetId: string) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const scrollPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }
  
	ngAfterViewInit() {
		setTimeout(function() {
			new bootstrap.ScrollSpy(document.body, {
				target: '.navbar-sticky',
				offset: 200
			})
		}, 0);
	}
}