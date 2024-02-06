import { Component, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AppSettings } from './service/app-settings.service';
import { StorageService } from './service/storage.service';
import { KeyService } from './service/key.service';
import { Subscription } from 'rxjs';
import { BroadcastService } from './service/broadcast.service';
import { BroadcastMessage } from './models/broadcast-message';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	appEvent = new EventEmitter<string>();
	appLoaded: boolean = false;
	isLoggedIn: boolean = false;
	public subscription: Subscription;

	constructor(
		public appSettings: AppSettings,
		private storageService: StorageService,
		private keyService: KeyService,
		private broadcastService: BroadcastService,
	) {
		this.subscription = this.broadcastService.subscribeTask()
			.subscribe((message: BroadcastMessage) => {
				if (message.sender === "isLoggedIn") {
					this.isLoggedIn = true;
				}
			});
	}

	handleSetCover(coverClass: string) {
		var htmlElm = document.querySelector('html');
		if (htmlElm) {
			for (var x = 0; x < document.documentElement.classList.length; x++) {
				var targetClass = document.documentElement.classList[x];
				if (targetClass.search('bg-cover-') > -1) {
					htmlElm.classList.remove(targetClass);
				}
			}
			htmlElm.classList.add(coverClass);
		}
	}

	handleSetMode(mode: string) {
		document.documentElement.setAttribute('data-bs-theme', mode);
		this.appEvent.emit('theme-reload');
	}

	handleSetTheme(themeClass: string) {
		for (var x = 0; x < document.body.classList.length; x++) {
			var targetClass = document.body.classList[x];
			if (targetClass.search('theme-') > -1) {
				document.body.classList.remove(targetClass);
			}
		}
		document.body.classList.add(themeClass);
		this.appEvent.emit('theme-reload');
	}

	ngOnInit() {
		var elm = document.body;
		if (elm) {
			elm.classList.add('app-init');
		}

		if (this.appSettings.appMode) {
			this.handleSetMode(this.appSettings.appMode);
		}
		if (this.appSettings.appTheme) {
			this.handleSetTheme(this.appSettings.appTheme);
		}
		if (this.appSettings.appCover) {
			this.handleSetCover(this.appSettings.appCover);
		}

		if (this.storageService.getData(this.keyService.TOKEN_KEY)) {
			this.isLoggedIn = true;
		}
	}

	ngAfterViewInit() {
		this.appLoaded = true;
	}
}
