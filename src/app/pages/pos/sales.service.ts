import { Observable, Subscription } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";
import { ProtectedService } from "../protected.service";
import { BaseService } from "../../shared/base.service";
import { AuthService } from "../../service/auth.service";
import { CreateSales } from "../../models/sales/create_sales.model";
import { SalesResponsePagination } from "../../models/sales/sales_response_pag.model";
import { Injectable } from "@angular/core";
import { Create } from "../../models/create.model";

@Injectable({ providedIn: 'root' })
export class SalesService extends BaseService {
    httpOptions: any;
    token: any;
    subscription: Subscription | any;
    companyId!: string;
    constructor(
        private resEndpoint: ResourceEndpointService,
        private http: HttpService,
        private protectedService: ProtectedService,
        private authService: AuthService
    ) {
        super();
        this.token = this.authService.getToken;
        this.companyId = this.authService.getCompanyId;
        this.httpOptions = this.protectedService.getHttpOptions(this.token);
    }

    createOrder(sales: CreateSales): Observable<any> {
        return this.http.post
            (
                `${this.resEndpoint.GetSalesUri}/offline`,
                sales,
                this.httpOptions
            ).pipe(map((response: any) => response), catchError(this.handleError));
    }

    getOrder(page: number, pageSize: number): Observable<SalesResponsePagination> {
        return this.http.get(
            `${this.resEndpoint.GetSalesUri}?page=${page}&pageSize=${pageSize}`,
            this.httpOptions
        ).pipe(
            map(
                (response: SalesResponsePagination) => response
            ),
            catchError(this.handleError)
        );
    }

    getOrderByCompany(page: number, pageSize: number, from: string, to: string): Observable<SalesResponsePagination> {
        return this.http.get(
            `${this.resEndpoint.GetSalesUri}/company/${this.companyId}?page=${page}&pageSize=${pageSize}&fromDate=${from}&toDate=${to}`,
            this.httpOptions
        ).pipe(
            map(
                (response: SalesResponsePagination) => response
            ),
            catchError(this.handleError)
        );
    }

    getOrderByCompanyFilter(page: number,
        pageSize: number, orderType: string,
        orderStatus: string): Observable<SalesResponsePagination> {
        return this.http.get(
            `${this.resEndpoint.GetSalesUri}/type/${orderType}/status/${orderStatus}?page=${page}&pageSize=${pageSize}`,
            this.httpOptions
        ).pipe(
            map(
                (response: SalesResponsePagination) => response
            ),
            catchError(this.handleError)
        );
    }

    startOrder(orderId: string, create: Create): Observable<any> {
        return this.http.patch(
            `${this.resEndpoint.GetSalesUri}/prepare/${orderId}`,
            create,
            this.httpOptions
        ).pipe(
            map(
                (response: any) => response
            ),
            catchError(this.handleError)
        );
    }

    completeOrder(orderId: string, create: Create): Observable<any> {
        return this.http.patch(
            `${this.resEndpoint.GetSalesUri}/complete/${orderId}`,
            create,
            this.httpOptions
        ).pipe(
            map(
                (response: any) => response
            ),
            catchError(this.handleError)
        );
    }

    cancelOrder(orderId: string, create: Create): Observable<any> {
        return this.http.patch(
            `${this.resEndpoint.GetSalesUri}/cancel/${orderId}`,
            create,
            this.httpOptions
        ).pipe(
            map(
                (response: any) => response
            ),
            catchError(this.handleError)
        );
    }



}