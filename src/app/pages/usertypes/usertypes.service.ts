import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { CreateUserType } from "../../models/usertypes/create-usertype.model";
import { UserType } from "../../models/usertypes/usertype.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserTypeService extends BaseService {
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
    this.httpOptions = this.protectedService.getHttpOptions(
      this.token
    );
}

public getUserTypes(page: number, pageSize: number): Observable<any> {
  let searchUrl: string;
    const baseUrl = this.resEndpoint.GetUserTypeUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    console.log(searchUrl);

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
}
public create(newUserType: CreateUserType): Observable<UserType> {
  return this.http
    .post(this.resEndpoint.GetUserTypeUri, newUserType, this.httpOptions)
    .pipe(
      tap((response: UserType) => {
        console.log(`Response: ${JSON.stringify(response)}`);
      }),
      map((response: any) => response),
      catchError(this.handleError)
    );
}

public edit(newUserType: UserType): Observable<UserType> {
  return this.http
    .patch(this.resEndpoint.GetUserTypeUri, newUserType, this.httpOptions)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
}
}