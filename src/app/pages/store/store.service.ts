import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { UploadImage } from "../../models/upload.model";
import { StoreCreate } from "../../models/store/store-create.model";
import { Store } from "../../models/store/store.model";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class StoreService extends BaseService {
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

  public getStores(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetStoreUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getStoresByCompanyId(
    companyId: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetStoreUri;
    let companyIdModified = companyId.replace(/["']/g, "");
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  uploadImage(file: File): Observable<UploadImage> {
    const formData: FormData = new FormData();
    formData.append("avatar", file, file.name);
    return this.http
      .post(
        `${this.resEndpoint.GetStoreUri}/upload`,
        formData,
        this.protectedService.getHttpOptionsForImage(this.token)
      )
      .pipe(
        tap((response: any) => {}),
        map((response: UploadImage) => response),
        catchError(this.handleError)
      );
  }

  public create(newStore: StoreCreate): Observable<Store> {
    return this.http
      .post(this.resEndpoint.GetStoreUri, newStore, this.httpOptions)
      .pipe(
        tap((response: Store) => {}),
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newStore: Store): Observable<Store> {
    return this.http
      .patch(this.resEndpoint.GetStoreUri, newStore, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetStoreDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  getStoreImage() {
    return `${this.resEndpoint.GetStoreUri}/image`;
  }
}
