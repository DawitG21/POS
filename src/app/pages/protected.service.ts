import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { BaseService } from '../shared/base.service';
import { ResourceEndpointService } from '../endpoints/resource-endpoint.service';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService extends BaseService {

  constructor(
    private http: HttpService,
    private resEndpoint: ResourceEndpointService,
  ) {
    super();
  }

  getHttpOptions(token: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getHttpOptionsForImage(token: string): any {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data; charset=UTF-8',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getHttpOptionsWithStatus(token: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }), observe: 'response',
    };
  }

  //   redirectUser(token: string) {
  //     return this.http.get(this.resEndpoint.AccountUri, this.getHttpOptions(token))
  //       .pipe(catchError(this.handleError));
  //   }

}
