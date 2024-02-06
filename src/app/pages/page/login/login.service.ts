import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ResourceEndpointService } from '../../../endpoints/resource-endpoint.service';
import { HttpService } from '../../../service/http.service';


import { BaseService } from '../../../shared/base.service';
import { ProtectedService } from '../../protected.service';
import { Login } from '../../../models/login.model';
import { LoginResponse } from '../../../models/login-response.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {

    httpOptions: any;
    token: any;
    subscription: Subscription | any;
    constructor(
        private resEndpoint: ResourceEndpointService,
        private http: HttpService,
        private protectedService: ProtectedService,
    ) {
        super();
        this.httpOptions = this.protectedService.getHttpOptions(this.token);
    }

    login(login: Login): Observable<LoginResponse> {
        return this.http.post(this.resEndpoint.LoginUri, login)
            .pipe(map((response: any) => response), catchError(this.handleError));
    }
}