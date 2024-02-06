import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { StorageService } from './storage.service';
import { KeyService } from './key.service';
import { SearchUser } from '../models/user/searchuser.model';
import { Company } from '../models/company/company.model';
import { RestaurantTable } from '../models/restaurant-table/restaurant-table.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    constructor(
        public storageService: StorageService,
        public keyService: KeyService,
    ) {
        super();
    }

    get getToken(): string {
        return this.storageService.getData(this.keyService.TOKEN_KEY);
    }

    get getCompanyId(): string {
        return this.storageService.getData(this.keyService.COMPANYID_KEY);
    }

    get getUserEmail(): string {
        return this.storageService.getData(this.keyService.EMAIL_KEY);
    }

    get getAvatar(): string {
        return this.storageService.getData(this.keyService.AVATAR_KEY);
    }

    get getUserId(): string {
        return this.storageService.getData(this.keyService.USERID_KEY);
    }

    get getUserObject(): SearchUser {
        return this.storageService.getData(this.keyService.USEROBJECT_KEY);
    }

    deleteUserObject(): void {
        this.storageService.deleteData(this.keyService.USEROBJECT_KEY);

    }

    get getCompanyObject(): Company {
        return this.storageService.getData(this.keyService.COMPANYOBJECT_KEY);
    }

    deleteCompanyObject(): void {
        this.storageService.deleteData(this.keyService.COMPANYOBJECT_KEY);
    }

    get getWaitorId(): string {
        return this.storageService.getData(this.keyService.WAITORID_KEY);
    }

    get getRestaurantTable(): RestaurantTable {
        return this.storageService.getData(this.keyService.RESTAURANT_TABLE_KEY);
    }


    deleteRestaurantTable(): void {
        this.storageService.deleteData(this.keyService.RESTAURANT_TABLE_KEY);

    }


    deleteWaitorId(): void {
        this.storageService.deleteData(this.keyService.WAITORID_KEY);

    }

    get getStoreId(): string {
        return this.storageService.getData(this.keyService.STORE_ID);
    }


}