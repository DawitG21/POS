import { Injectable } from "@angular/core";

import { Observable, Subscription, catchError, map } from "rxjs";
import { Accounts } from "../../../models/accounts/accounts.model";
import { ResourceEndpointService } from "../../../endpoints/resource-endpoint.service";
import { HttpService } from "../../../service/http.service";
import { BaseService } from "../../../shared/base.service";
import { ProtectedService } from "../../protected.service";
import { AuthService } from "../../../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class CreateAccountService extends BaseService {
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

  saveAccount(account: Accounts): Observable<Accounts> {
    return this.http
      .post(this.resEndpoint.GetAccountssUri, account, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
