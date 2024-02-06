// change-password.service.ts

import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../shared/base.service';
import { ResourceEndpointService } from '../../endpoints/resource-endpoint.service';
import { HttpService } from '../../service/http.service';
import { ProtectedService } from '../protected.service';
import { AuthService } from '../../service/auth.service';
import { ChangePassword } from '../../models/user/change_user_password.model';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswords extends BaseService {

  httpOptions: any;

  constructor(
    private resEndpoint: ResourceEndpointService,
    private http: HttpService,
    private protectedService: ProtectedService,
    private authService: AuthService
  ) {
    super();
    this.httpOptions = this.protectedService.getHttpOptions(this.authService.getToken);
  }

  public edit(newPassword: ChangePassword): Observable<any> {
    return this.http.patch(this.resEndpoint.GetChangePasswordUri, newPassword, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
