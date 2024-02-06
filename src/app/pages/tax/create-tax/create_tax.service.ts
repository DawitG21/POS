import { Injectable } from "@angular/core";
import { Observable, Subscription, catchError, map } from "rxjs";
import { TaxModel } from "../../../models/tax/taxs.model";
import { ResourceEndpointService } from "../../../endpoints/resource-endpoint.service";
import { HttpService } from "../../../service/http.service";
import { BaseService } from "../../../shared/base.service";
import { ProtectedService } from "../../protected.service";
import { AuthService } from "../../../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class CreateTaxService extends BaseService {
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

  saveTax(tax: TaxModel): Observable<TaxModel> {
    return this.http
      .post(this.resEndpoint.GetTaxsUri, tax, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
