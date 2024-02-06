import { Injectable } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";
import { StorageService } from "../../service/storage.service";
import { ProtectedService } from "../protected.service";
import { BaseService } from "../../shared/base.service";
import { CustomerCreate } from "../../models/customer/customer-create.model";
import { Customer } from "../../models/customer/customer.model";
import { CustomerPagination } from "../../models/customer/customer.pag.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService extends BaseService {
  httpOptions: any;
  token: any;
  subscription: Subscription | any;

  constructor(
    private resEndpoint: ResourceEndpointService,
    private http: HttpService,
    private protectedService: ProtectedService,
    private storageService: StorageService
  ) {
    super();
    this.token = this.storageService.getData("token");
    this.httpOptions = this.protectedService.getHttpOptions(this.token);
  }

  getCustomers(page: number, pageSize: number): Observable<any> {
    return this.http
      .get(
        `${this.resEndpoint.GetCustomerUri}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public getCustomersbyCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetCustomerUri;
    let companyIdModified = companyId.replace(/["']/g, "");
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  createCustomer(newCustomer: CustomerCreate): Observable<Customer> {
    return this.http
      .post(this.resEndpoint.GetCustomerUri, newCustomer, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newCustomer: Customer): Observable<Customer> {
    return this.http
      .patch(this.resEndpoint.GetCustomerUri, newCustomer, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.getCustomerDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  getCustomerByCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<CustomerPagination> {
    return this.http
      .get(
        `${this.resEndpoint.GetCustomerUri}/company/${companyId}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        map((response: CustomerPagination) => response),
        catchError(this.handleError)
      );
  }
}
