//import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

//import { IdentityService } from './identity.service';
//import { Injectable } from '@angular/core';

import { StorageService } from '../service/storage.service';
import { KeyService } from '../service/key.service';

@Injectable({
    providedIn: 'root'
})
class PermissionsService {

    constructor(
        private router: Router,
        private storageService: StorageService,
		private keyService: KeyService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var token = this.storageService.getData(this.keyService.TOKEN_KEY);
        if (token && this.router.navigated) {
            return true;
        }
        this.router.navigate(['/page/login']);
        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}