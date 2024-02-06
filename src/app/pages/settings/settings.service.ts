import { Injectable } from "@angular/core";
import { Observable, Subscription, catchError, map } from "rxjs";
import { SettingsList } from "../../models/settings/settings_list.model";
import { BaseService } from "../../shared/base.service";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AllSettingsService extends BaseService {
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

  public getSettings(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetSettingsUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getSettingsbyCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetSettingsUri;
    let companyIdModified = companyId.replace(/["']/g, "");
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public edit(newSetting: SettingsList): Observable<SettingsList> {
    return this.http
      .patch(this.resEndpoint.GetSettingsUri, newSetting, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
