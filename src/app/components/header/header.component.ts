import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { AppSettings } from '../../service/app-settings.service';
// import { HeaderService } from "./header.service";
import { StorageService } from '../../service/storage.service';
import { KeyService } from '../../service/key.service';
import { Router } from '@angular/router';
import { AuthService } from "../../service/auth.service";
import { ResourceEndpointService } from '../../endpoints/resource-endpoint.service';

declare var slideToggle: any;

interface NotificationData {
	icon: string;
	title: string;
	time: string;
}

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	host: {
		class: 'app-header'
	}
})
export class HeaderComponent {
	notificationData: NotificationData[] = [{
		icon: 'bi bi-bag text-theme',
		title: 'NEW ORDER RECEIVED ($1,299)',
		time: 'JUST NOW'
	}, {
		icon: 'bi bi-person-circle text-theme',
		title: '3 NEW ACCOUNT CREATED',
		time: '2 MINUTES AGO'
	}, {
		icon: 'bi bi-gear text-theme',
		title: 'SETUP COMPLETED',
		time: '3 MINUTES AGO'
	}, {
		icon: 'bi bi-grid text-theme',
		title: 'WIDGET INSTALLATION DONE',
		time: '5 MINUTES AGO'
	}, {
		icon: 'bi bi-credit-card text-theme',
		title: 'PAYMENT METHOD ENABLED',
		time: '10 MINUTES AGO'
	}];

	email!: string;
	avatar!: string;
	imageUrl!: string;


	constructor(public appSettings: AppSettings,
		// private headerService: HeaderService,
		private storageService: StorageService,
		private keyService: KeyService,
		private router: Router,
		private authService: AuthService,
		private resEndpoint: ResourceEndpointService,

	) {
		this.email = this.authService.getUserEmail;
		this.avatar = this.authService.getAvatar;
		this.imageUrl = `${this.resEndpoint.GetUserUri}/image/${this.avatar}`;
	}

	handleToggleSidebarCollapsed(event: MouseEvent) {
		event.preventDefault();

		if (!this.appSettings.appSidebarNone) {
			var elm = document.getElementById('app');
			if (elm) {
				elm.classList.toggle('app-sidebar-collapsed');
			}
		}
	}

	handleToggleMobileSidebar(event: MouseEvent) {
		event.preventDefault();

		if (!(this.appSettings.appSidebarNone && this.appSettings.appTopNav)) {
			var elm = document.getElementById('app');
			if (elm) {
				elm.classList.toggle('app-sidebar-mobile-toggled');
			}
		} else {
			slideToggle(document.querySelector('.app-top-nav'));
			window.scrollTo(0, 0);
		}
	}

	handleAppToggleClass(event: MouseEvent, className: string) {
		event.preventDefault();

		var elm = document.getElementById('app');
		if (elm) {
			elm.classList.toggle(className);
		}
	}

	logout() {
		this.storageService.deleteData(this.keyService.TOKEN_KEY);
		this.storageService.deleteData(this.keyService.COMPANYID_KEY);
		this.storageService.deleteData(this.keyService.EMAIL_KEY);
		this.storageService.deleteData(this.keyService.AVATAR_KEY);
		this.storageService.deleteData(this.keyService.USERID_KEY);
		this.storageService.deleteData(this.keyService.CLAIMS_KEY);
		this.storageService.deleteData(this.keyService.CLAIMS_KEY_ROW);
		this.storageService.deleteData(this.keyService.USERTYPE_ID);
		this.storageService.deleteData(this.keyService.USERTYPE_NAME);
		this.router.navigate(['/page/login']);
	}
}
