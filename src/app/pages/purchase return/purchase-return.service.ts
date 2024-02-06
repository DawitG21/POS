import { Injectable } from "@angular/core";

import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { PurchaseReturnCreate } from "../../models/purchase-return/purchase-return-create.model";
import { PurchaseReturn } from "../../models/purchase-return/purchase-return.model";

@Injectable({
  providedIn: "root",
})
export class PurchaseReturnService extends BaseService {
  httpOptions: any;
  token: any;
  subscription: Subscription | any;
  constructor(
    private resEndpoint: ResourceEndpointService,
    private http: HttpService,
    private protectedService: ProtectedService,
    private authService: AuthService
  ) {
    super();
    this.httpOptions = this.protectedService.getHttpOptions(
      this.authService.getToken
    );
  }

  public getPurchaseReturn(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetPurchaseReturnUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    console.log(searchUrl);

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public create(
    newPurchaseReturn: PurchaseReturnCreate
  ): Observable<PurchaseReturn> {
    return this.http
      .post(
        this.resEndpoint.GetPurchaseReturnUri,
        newPurchaseReturn,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(
    newPurchaseReturn: PurchaseReturn,
    id: string
  ): Observable<PurchaseReturn> {
    return this.http
      .patch(
        this.resEndpoint.updatePurchaseReturnUri(id),
        newPurchaseReturn,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetPurchaseReturnDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public getPurchaseReturnByCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetPurchaseReturnUri;
    searchUrl = `${baseUrl}/company/${companyId}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }
}
