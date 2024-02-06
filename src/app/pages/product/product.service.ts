import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { UploadImage } from "../../models/upload.model";
import { ProductCreate } from "../../models/product/product-create.model";
import { Product } from "../../models/product/product.model";
import { ProductPagination } from "../../models/product/product-pag.model";
@Injectable({
  providedIn: "root",
})
export class ProductService extends BaseService {
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

  public getProducts(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetProductUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
    //console.log(searchUrl);

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
        `${this.resEndpoint.GetProductUri}/upload`,
        formData,
        this.protectedService.getHttpOptionsForImage(this.token)
      )
      .pipe(
        tap((response: any) => {
          //console.log(`Response Image: ${JSON.stringify(response)}`);
        }),
        map((response: UploadImage) => response),
        catchError(this.handleError)
      );
  }

  public create(newProduct: ProductCreate): Observable<Product> {
    return this.http
      .post(this.resEndpoint.GetProductUri, newProduct, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newProduct: Product): Observable<Product> {
    return this.http
      .patch(this.resEndpoint.GetProductUri, newProduct, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.getProductDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public getProductsByCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<ProductPagination> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetProductUri;
    searchUrl = `${baseUrl}/company/${companyId}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getProductsById(productID: string): Observable<Product> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetProductUri;
    searchUrl = `${baseUrl}/${productID}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  getProductImage() {
    return `${this.resEndpoint.GetProductUri}/image`;
  }
}
