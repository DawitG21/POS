import { Observable, Subscription, catchError, map, tap } from "rxjs";
import { BaseService } from "../shared/base.service";
import { ResourceEndpointService } from "../endpoints/resource-endpoint.service";
import { HttpService } from "../service/http.service";
import { ProtectedService } from "./protected.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { StockPagination } from "../models/stock/stock.pag.model";

@Injectable({ providedIn: "root" })
export class StockService extends BaseService {
  httpOptions: any;
  token: any;
  subscription: Subscription | any;
  storeId!: string;

  constructor(
    private resEndpoint: ResourceEndpointService,
    private http: HttpService,
    private protectedService: ProtectedService,
    private authService: AuthService
  ) {
    super();
    this.token = this.authService.getToken;
    this.storeId = this.authService.getStoreId;
    this.httpOptions = this.protectedService.getHttpOptions(this.token);
  }

  getStock(page: number, pageSize: number): Observable<StockPagination> {
    return this.http
      .get(
        `${this.resEndpoint.GetStockUri}/store/${this.storeId}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        tap((response: StockPagination) => {
          console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: StockPagination) => response),
        catchError(this.handleError)
      );
  }

  getStockByStockId(
    stockId: string,
    page: number,
    pageSize: number
  ): Observable<StockPagination> {
    return this.http
      .get(
        `${this.resEndpoint.GetStockUri}/store/${stockId}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        tap((response: StockPagination) => {
          console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: StockPagination) => response),
        catchError(this.handleError)
      );
  }
}
