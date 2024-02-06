import { Component, OnInit } from '@angular/core';
import { AppMenuService } from '../../service/app-menus.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { KeyService } from '../../service/key.service';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	host: {
		class: 'app-sidebar'
	}
})

export class SidebarComponent implements OnInit {
	menus: any[] = [];
	claims!: any[];
	userType!: string;

	constructor(
		private appMenuService: AppMenuService,
		private router: Router,
		private storageService: StorageService,
		private keyService: KeyService
	) { }

	ngOnInit() {
		this.menus = this.appMenuService.getAppMenus();
		this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY_ROW);
		this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
	}

	isShowMenu(flag: string) {
		for (let i = 0; i < this.claims.length; i++) {
			if (this.claims[i] == flag) return true
		}
		return false
	}

	isShowMainMenu(accessby: string, childern: any) {
		let showMainMenu = false;
		if (this.userType == "POS Owner") {
			return true;
		}

		if (childern != undefined) {
			for (let i = 0; i < childern.length; i++) {
				showMainMenu = this.isShowMenu(childern[i].flag);
				if (showMainMenu) break;
			}
		} else {
			showMainMenu = true;
		}

		var str = this.userType.substring(0, this.userType.indexOf(' '));
		if (str == accessby && showMainMenu) return true;
		return false;
	}

	isActive(path: string) {
		return this.router.url === path;
	}

	isChildActive(menus: any) {
		var active = false;
		if (menus.length > 0) {
			for (let menu of menus) {
				if (this.router.url === menu.path) {
					active = true;
				}
			}
		}
		return active;
	}

	handleExpandSubmenu(event: MouseEvent) {
		event.preventDefault();
		var targetMenuLinkElm = event.target as HTMLElement;
		var targetMenuItemElm = targetMenuLinkElm.closest('.menu-item');

		if (targetMenuItemElm) {
			var targetSubmenu = targetMenuItemElm.querySelector('.menu-submenu');
			var targetSubmenuElm = targetSubmenu as HTMLElement;
			var hassubMenuLinkList = [].slice.call(document.querySelectorAll('.app-sidebar .menu > .menu-item.has-sub > .menu-link'));

			if (hassubMenuLinkList) {
				hassubMenuLinkList.map(function (menuLink) {
					var menuLinkElm = menuLink as HTMLElement;
					var menuItemElm = menuLinkElm.closest('.menu-item');

					if (menuItemElm) {
						var submenu = menuItemElm.querySelector('.menu-submenu');
						var submenuElm = submenu as HTMLElement;

						if (submenuElm != targetSubmenuElm) {
							submenuElm.style.display = 'none';
							menuItemElm.classList.remove('expand');
						}
					}
				});
			}

			if (targetMenuItemElm.classList.contains('expand') || (targetMenuItemElm.classList.contains('active') && !targetSubmenuElm.style.display)) {
				targetMenuItemElm.classList.remove('expand');
				targetSubmenuElm.style.display = 'none';
			} else {
				targetMenuItemElm.classList.add('expand');
				targetSubmenuElm.style.display = 'block';
			}
		}
	}
}
