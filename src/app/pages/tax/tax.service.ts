import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, map } from 'rxjs';
import { ListOfTax } from '../../models/tax/tax_list.model'; 
import { BaseService } from '../../shared/base.service';
import { ResourceEndpointService } from '../../endpoints/resource-endpoint.service';
import { HttpService } from '../../service/http.service';
import { ProtectedService } from '../protected.service';
import { AuthService } from '../../service/auth.service';
@Injectable({
  providedIn: 'root',
})

export class AllTaxService extends BaseService {


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
        this.httpOptions = this.protectedService.getHttpOptions(this.authService.getToken);
    }
  
    public getTax(page: number, pageSize: number): Observable<any> {
      let searchUrl: string;
      const baseUrl = this.resEndpoint.GetTaxsUri;
      searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
  
  
      return this.http.get(searchUrl, this.httpOptions)
          .pipe(map((response: any) => response), catchError(this.handleError));
  }
  
  public edit(newTax: ListOfTax): Observable<ListOfTax> {
      return this.http.patch(this.resEndpoint.GetTaxsUri, newTax, this.httpOptions)
          .pipe(map((response: any) => response), catchError(this.handleError));
  }
  
  
  
  public delete(id: string): Observable<any> {
      return this.http.delete(this.resEndpoint.GetTaxDeleteUri(id), this.httpOptions)
        .pipe(map((response: any) => response), catchError(this.handleError));
    }
  
  
  }
  