import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { RestaurantTable } from "../../models/restaurant-table/restaurant-table.model";
import { CreateRestaurantTable } from "../../models/restaurant-table/create-restaurant-table.model";

@Injectable({
  providedIn: "root",
})
export class RestaurantTableService extends BaseService {
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

  public getRestaurantTables(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetRestaurantTableUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getRestaurantTablesByCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = `${this.resEndpoint.GetRestaurantTableUri}/restaurant/${companyId}`;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  getRestaurantTablesByTableId(id: string): Observable<RestaurantTable> {
    let searchUrl: string;
    const baseUrl = `${this.resEndpoint.GetRestaurantTableUri}`;
    searchUrl = `${baseUrl}/${id}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: RestaurantTable) => response),
      catchError(this.handleError)
    );
  }

  public create(
    newRestaurantTable: CreateRestaurantTable
  ): Observable<RestaurantTable> {
    return this.http
      .post(
        this.resEndpoint.GetRestaurantTableUri,
        newRestaurantTable,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(
    newRestaurantTable: RestaurantTable
  ): Observable<RestaurantTable> {
    return this.http
      .patch(
        this.resEndpoint.GetRestaurantTableUri,
        newRestaurantTable,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(
        this.resEndpoint.GetRestaurantTableDeleteUri(id),
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
