import { Injectable } from "@angular/core";
import { Observable, Subscription, catchError, map } from "rxjs";

import { ListOfAccounts } from "../../models/accounts/accounts_list.model";

import { BaseService } from "../../shared/base.service";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
@Injectable({
  providedIn: "root",
})
export class AccountsService extends BaseService {
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

  public getAccounts(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetAccountssUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getAccountsbyCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetAccountssUri;
    let companyIdModified = companyId.replace(/["']/g, "");
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public edit(newAccount: ListOfAccounts): Observable<ListOfAccounts> {
    return this.http
      .patch(this.resEndpoint.GetAccountssUri, newAccount, this.httpOptions)
      .pipe(
        map((response: ListOfAccounts) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetAccountDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
