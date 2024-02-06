import { Injectable } from "@angular/core";
import { ConfigService } from "../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class ResourceEndpointService {
  constructor(private configService: ConfigService) {}

  get LoginUri(): string {
    return `${this.configService.resourceApiServiceURI}/login`;
  }

  //company endpoints
  get GetCompanyUri(): string {
    return `${this.configService.resourceApiServiceURI}/companies`;
  }

  //users endpoints
  get GetUserUri(): string {
    return `${this.configService.resourceApiServiceURI}/users`;
  }

  //roles endpoint
  get GetRoleUri(): string {
    return `${this.configService.resourceApiServiceURI}/roles`;
  }

  GetRoleDeleteUri(id: string) {
    return `${this.GetRoleUri}/${id}`;
  }

  //store endpoint
  get GetStoreUri(): string {
    return `${this.configService.resourceApiServiceURI}/stores`;
  }

  // get GetStoreAvatarUri(): string {
  //   return `${this.configService.resourceApiServiceURI}/stores/image`;
  // }

  GetStoreDeleteUri(id: string) {
    return `${this.GetStoreUri}/${id}`;
  }

  //Category endpoint
  get GetCategoryUri(): string {
    return `${this.configService.resourceApiServiceURI}/categories`;
  }
  get GetCategoryAvatarUri(): string {
    return `${this.configService.resourceApiServiceURI}/categories/image`;
  }
  GetCategoryDeleteUri(id: string) {
    return `${this.GetCategoryUri}/${id}`;
  }

  //RestaurantTable endpoints
  get GetRestaurantTableUri(): string {
    return `${this.configService.resourceApiServiceURI}/restaurant/tables`;
  }
  // get GetRestaurantTableAvatarUri(): string {
  //   return `${this.configService.resourceApiServiceURI}/restaurant/tables/image`;
  // }
  GetRestaurantTableDeleteUri(id: string) {
    return `${this.GetRestaurantTableUri}/${id}`;
  }

  get GetCustomerUri(): string {
    return `${this.configService.resourceApiServiceURI}/customers`;
  }

  getCustomerDeleteUri(id: string) {
    return `${this.GetCustomerUri}/${id}`;
  }

  // suppliers endpoint

  get GetUnitsUri(): string {
    return `${this.configService.resourceApiServiceURI}/units`;
  }

  get GetChangePasswordUri(): string {
    return `${this.configService.resourceApiServiceURI}/users/resetpwd`;
  }

  get GetSettingsUri(): string {
    return `${this.configService.resourceApiServiceURI}/settings`;
  }

  get GetTaxsUri(): string {
    return `${this.configService.resourceApiServiceURI}/taxes`;
  }

  get GetAccountssUri(): string {
    return `${this.configService.resourceApiServiceURI}/accounts`;
  }

  GetUnitDeleteUri(id: string) {
    return `${this.GetUnitsUri}/${id}`;
  }

  GetTaxDeleteUri(id: string) {
    return `${this.GetTaxsUri}/${id}`;
  }

  GetAccountDeleteUri(id: string) {
    return `${this.GetAccountssUri}/${id}`;
  }

  get GetSupplierUri(): string {
    return `${this.configService.resourceApiServiceURI}/suppliers`;
  }

  getSupplierDeleteUri(id: string) {
    return `${this.GetSupplierUri}/${id}`;
  }

  // Product endpoint

  get GetProductUri(): string {
    return `${this.configService.resourceApiServiceURI}/products`;
  }

  getProductDeleteUri(id: string) {
    return `${this.GetProductUri}/${id}`;
  }

  //Purchase endpoint
  get GetPurchaseUri(): string {
    return `${this.configService.resourceApiServiceURI}/purchases`;
  }

  updatePurchaseUri(id: string): string {
    return `${this.GetPurchaseUri}/transcode/${id}`;
  }

  GetPurchaseDeleteUri(id: string) {
    return `${this.GetPurchaseUri}/${id}`;
  }

  //Purchase Return endpoint
  get GetPurchaseReturnUri(): string {
    return `${this.configService.resourceApiServiceURI}/purchaseReturn`;
  }

  updatePurchaseReturnUri(id: string): string {
    return `${this.GetPurchaseReturnUri}/transcode/${id}`;
  }

  GetPurchaseReturnDeleteUri(id: string) {
    return `${this.GetPurchaseReturnUri}/${id}`;
  }

  //Transfers URIs
  get GetTransferUri(): string {
    return `${this.configService.resourceApiServiceURI}/transfers`;
  }
  get GetTransferAvatarUri(): string {
    return `${this.configService.resourceApiServiceURI}/transfers/image`;
  }
  GetTransferDeleteUri(id: string) {
    return `${this.GetTransferUri}/${id}`;
  }
  get GetSalesUri(): string {
    return `${this.configService.resourceApiServiceURI}/sales`;
  }

  //Adjustments URIs
  get GetAdjustmentsUri(): string {
    return `${this.configService.resourceApiServiceURI}/adjustments`;
  }
  GetAdjustmentsDeleteUri(id: string) {
    return `${this.GetAdjustmentsUri}/${id}`;
  }

  // Permission endpoint

  get GetPermissionUri(): string {
    return `${this.configService.resourceApiServiceURI}/permissions`;
  }

  getPermissionDeleteUri(id: string) {
    return `${this.GetPermissionUri}/${id}`;
  }

  get GetActivityLogUri(): string {
    return `${this.configService.resourceApiServiceURI}/logs`;
  }

  //User Types endpoints
  get GetUserTypeUri(): string {
    return `${this.configService.resourceApiServiceURI}/usertypes`;
  }

  get GetStockUri(): string {
    return `${this.configService.resourceApiServiceURI}/stocks`;
  }

  // Report Endpoints
  get GetStoreReportUri(): string {
    return `${this.configService.resourceApiServiceURI}/stores/report`;
  }

  get GetSupplierReportUri(): string {
    return `${this.configService.resourceApiServiceURI}/suppliers/report`;
  }
}
