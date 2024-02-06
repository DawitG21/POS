import { Injectable } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";
import { StorageService } from "../../service/storage.service";
import { ProtectedService } from "../protected.service";
import { BaseService } from "../../shared/base.service";
import { SupplierCreate } from "../../models/supplier/suppllier-create.model";
import { Supplier } from "../../models/supplier/supllier.model";

@Injectable({
  providedIn: "root",
})
export class SupplierService extends BaseService {
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

  getSuppliers(page: number, pageSize: number): Observable<any> {
    return this.http
      .get(
        `${this.resEndpoint.GetSupplierUri}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public getSuppliersbyCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetSupplierUri;
    let companyIdModified = companyId.replace(/["']/g, "");
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  createSupplier(newSupplier: SupplierCreate): Observable<Supplier> {
    return this.http
      .post(this.resEndpoint.GetSupplierUri, newSupplier, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newSupplier: Supplier): Observable<Supplier> {
    return this.http
      .patch(this.resEndpoint.GetSupplierUri, newSupplier, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.getSupplierDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }
}
