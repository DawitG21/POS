import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { HttpService } from "../../service/http.service";

import { BaseService } from "../../shared/base.service";
import { ProtectedService } from "../protected.service";
import { AuthService } from "../../service/auth.service";
import { UploadImage } from "../../models/upload.model";
import { Category } from "../../models/category/category.model";
import { CategoryPagination } from "../../models/category/category-pag.model";
import { CategoryCreate } from "../../models/category/category-create.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService {
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

  public getCategories(page: number, pageSize: number): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetCategoryUri;
    searchUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
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
        `${this.resEndpoint.GetCategoryUri}/upload`,
        formData,
        this.protectedService.getHttpOptionsForImage(this.token)
      )
      .pipe(
        tap((response: any) => {}),
        map((response: UploadImage) => response),
        catchError(this.handleError)
      );
  }

  public getCategoriesbyCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<any> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetCategoryUri;
    let companyIdModified = companyId.replace(/["']/g, "");
    searchUrl = `${baseUrl}/company/${companyIdModified}?page=${page}&pageSize=${pageSize}`;

    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public create(newCategory: CategoryCreate): Observable<Category> {
    return this.http
      .post(this.resEndpoint.GetCategoryUri, newCategory, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public edit(newCategory: Category): Observable<Category> {
    return this.http
      .patch(this.resEndpoint.GetCategoryUri, newCategory, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(this.resEndpoint.GetCategoryDeleteUri(id), this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  public getCategoriesByCompany(
    page: number,
    pageSize: number,
    companyId: string
  ): Observable<CategoryPagination> {
    let searchUrl: string;
    const baseUrl = this.resEndpoint.GetCategoryUri;
    searchUrl = `${baseUrl}/company/${companyId}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(searchUrl, this.httpOptions).pipe(
      map((response: CategoryPagination) => response),
      catchError(this.handleError)
    );
  }

  getCategoryImage() {
    // `.../imageName`
    return `${this.resEndpoint.GetCategoryUri}/image`;
  }
}
