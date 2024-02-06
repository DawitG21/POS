import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";

@Injectable({
    providedIn: "root",
})
export class ReportService extends BaseService {
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
        this.token = this.authService.getToken;
        this.httpOptions = this.protectedService.getHttpOptions(this.token);
    }

    public getStoresByCompanyIdReport(
        companyId: string,
        page: number,
        pageSize: number
    ): Observable<any> {
        let searchUrl: string;
        const baseUrl = this.resEndpoint.GetStoreReportUri;
        let companyIdModified = companyId.replace(/["']/g, "");
        searchUrl = `${baseUrl}/companyId/${companyIdModified}/store/0?page=${page}&pageSize=${pageSize}`;

        return this.http.get(searchUrl, this.httpOptions).pipe(
            map((response: any) => response),
            catchError(this.handleError)
        );
    }

    public getSuppliersByCompanyIdReport(
        companyId: string,
        page: number,
        pageSize: number
    ): Observable<any> {
        let searchUrl: string;
        const baseUrl = this.resEndpoint.GetSupplierReportUri;
        let companyIdModified = companyId.replace(/["']/g, "");
        searchUrl = `${baseUrl}/companyId/${companyIdModified}/supplier/0?page=${page}&pageSize=${pageSize}`;

        return this.http.get(searchUrl, this.httpOptions).pipe(
            map((response: any) => response),
            catchError(this.handleError)
        );
    }
}