import { Injectable } from "@angular/core";
import { Observable, Subscription, catchError, map } from "rxjs";
import { Settings } from "../../../models/settings/settings.model";
import { ResourceEndpointService } from "../../../endpoints/resource-endpoint.service";
import { HttpService } from "../../../service/http.service";
import { BaseService } from "../../../shared/base.service";
import { ProtectedService } from "../../protected.service";
import { AuthService } from "../../../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class CreateSettingsService extends BaseService {
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

  saveSetting(setting: Settings): Observable<Settings> {
    return this.http
      .post(this.resEndpoint.GetSettingsUri, setting, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
