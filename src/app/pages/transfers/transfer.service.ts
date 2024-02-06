import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ResourceEndpointService } from '../../endpoints/resource-endpoint.service';
import { HttpService } from '../../service/http.service';

import { BaseService } from '../../shared/base.service';
import { ProtectedService } from '../protected.service';
import { AuthService } from '../../service/auth.service';
import { UploadImage } from '../../models/upload.model';
import { StoreCreate } from '../../models/store/store-create.model';
import { Store } from '../../models/store/store.model';
import { Transfer } from '../../models/transfer/transfer.model';
import { TransferCreate } from '../../models/transfer/transfer-create.model';

@Injectable({
    providedIn: 'root'
})

export class TransferService extends BaseService {
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

  public getTransfers(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetTransferUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    console.log(searchUrl);

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getTransfersbyCompany(page: number, pageSize: number, companyId: string): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetTransferUri;
    let companyIdModified = companyId.replace(/["']/g, '');
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;
  
    return this.http.get(searchUrl, this.httpOptions)
      .pipe(map((response: any) => response), catchError(this.handleError));
  }

  public create(newTransfer: TransferCreate): Observable<Transfer> {
    return this.http
      .post(this.resEndpoint.GetTransferUri, newTransfer, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newTransfer: Transfer): Observable<Transfer> {
    return this.http
      .patch(this.resEndpoint.GetTransferUri, newTransfer, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetTransferDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

}