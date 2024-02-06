import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/base.service";
import { Observable, Subscription } from "rxjs";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";
import { StorageService } from "../../service/storage.service";
import { ProtectedService } from "../protected.service";
import { CreateRole } from "../../models/role/createrole.model";
import { tap, map, catchError } from "rxjs/operators";
import { RolePagination } from "../../models/role/role.pag.model";
import { AuthService } from "../../service/auth.service";

@Injectable({ providedIn: "root" })
export class RoleService extends BaseService {
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

  createRole(role: CreateRole): Observable<CreateRole> {
    return this.http
      .post(`${this.resEndpoint.GetRoleUri}`, role, this.httpOptions)
      .pipe(
        tap((response: CreateRole) => {
          //console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: CreateRole) => response),
        catchError(this.handleError)
      );
  }

  getRoles(page: number, pageSize: number): Observable<any> {
    return this.http
      .get(
        `${this.resEndpoint.GetRoleUri}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        tap((response: RolePagination) => {
          //console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: RolePagination) => response),
        catchError(this.handleError)
      );
  }

  getRole(roleId: string): Observable<CreateRole> {
    return this.http
      .get(`${this.resEndpoint.GetRoleUri}/${roleId}`, this.httpOptions)
      .pipe(
        tap((response: CreateRole) => {
          console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: CreateRole) => response),
        catchError(this.handleError)
      );
  }

  updateRole(role: CreateRole): Observable<CreateRole> {
    return this.http
      .patch(`${this.resEndpoint.GetRoleUri}`, role, this.httpOptions)
      .pipe(
        tap((response: CreateRole) => {
          //console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: CreateRole) => response),
        catchError(this.handleError)
      );
  }

  getRoleByCompanyId(
    companyId: string,
    page: number,
    pageSize: number
  ): Observable<RolePagination> {
    let companyIdModified = companyId.replace(/["']/g, "");
    return this.http
      .get(
        `${this.resEndpoint.GetRoleUri}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        tap((response: RolePagination) => {
          //console.log(`Response: ${JSON.stringify(response)}`);
        }),
        map((response: RolePagination) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetRoleDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
