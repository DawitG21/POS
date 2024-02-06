import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { Adjustments } from "../../models/adjustments/adjustments.model";
import { AdjustmentCreate } from "../../models/adjustments/create-adjustments.model";
@Injectable({
  providedIn: "root",
})

export class AdjustmentService extends BaseService {
  httpOptions: any;
  token: any;
  subscription: Subscription | any;

  constructor(
    private resEndpoint: ResourceEndpointService,
    private http: HttpService,
    private protectedService: ProtectedService,
    private authService: AuthService
  ){
    super();
    this.httpOptions = this.protectedService.getHttpOptions(
      this.authService.getToken
    );
  }

  public getAdjustments(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetAdjustmentsUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    console.log(searchUrl);

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getAdjustmentsbyCompany(page: number, pageSize: number, companyId: string): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetAdjustmentsUri;
    let companyIdModified = companyId.replace(/["']/g, '');
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;
  
    return this.http.get(searchUrl, this.httpOptions)
      .pipe(map((response: any) => response), catchError(this.handleError));
  }

  public create(newAdjustment: AdjustmentCreate): Observable<Adjustments> {
    return this.http
      .post(this.resEndpoint.GetAdjustmentsUri, newAdjustment, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newAdjustment: Adjustments): Observable<Adjustments> {
    return this.http
      .patch(
        this.resEndpoint.GetAdjustmentsUri, newAdjustment, this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetAdjustmentsDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}