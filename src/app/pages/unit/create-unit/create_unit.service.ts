import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, catchError, map } from "rxjs";
import { Units } from "../../../models/units/units.model";
import { ResourceEndpointService } from "../../../endpoints/resource-endpoint.service";
import { HttpService } from "../../../service/http.service";
import { BaseService } from "../../../shared/base.service";
import { ProtectedService } from "../../protected.service";
import { AuthService } from "../../../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class CreateUnitService extends BaseService {
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

  saveUnit(unit: Units): Observable<Units> {
    return this.http
      .post(this.resEndpoint.GetUnitsUri, unit, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
