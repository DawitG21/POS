import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { Permission } from "../../models/permission/permission.model";
import { PermissionCreate } from "../../models/permission/permission-create.model";

@Injectable({
  providedIn: "root",
})
export class PermissionService extends BaseService {
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

  public getPermission(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetPermissionUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    console.log(searchUrl);

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public create(newPermission: PermissionCreate): Observable<Permission> {
    return this.http
      .post(this.resEndpoint.GetPermissionUri, newPermission, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newPermission: Permission): Observable<Permission> {
    return this.http
      .patch(this.resEndpoint.GetPermissionUri, newPermission, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.getPermissionDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
