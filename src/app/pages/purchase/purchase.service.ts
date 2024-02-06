import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { PurchaseCreate } from "../../models/purchase/purchase-create.model";
import { Purchase } from "../../models/purchase/purchase.model";

@Injectable({
  providedIn: "root",
})
export class PurchaseService extends BaseService {
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

  public getPurchases(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetPurchaseUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    console.log(searchUrl);

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public create(newPurchase: PurchaseCreate): Observable<Purchase> {
    return this.http
      .post(this.resEndpoint.GetPurchaseUri, newPurchase, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newPurchase: Purchase, id: string): Observable<Purchase> {
    return this.http
      .patch(
        this.resEndpoint.updatePurchaseUri(id),
        newPurchase,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetPurchaseDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public getPurchaseByCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetPurchaseUri;
    searchUrl = `${baseUrl}/company/${companyId}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }
}
