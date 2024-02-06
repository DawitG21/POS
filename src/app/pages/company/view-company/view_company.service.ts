import { Observable, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ResourceEndpointService } from "../../../endpoints/resource-endpoint.service";
import { HttpService } from "../../../service/http.service";
import { ProtectedService } from "../../protected.service";
import { BaseService } from "../../../shared/base.service";
import { Company } from "../../../models/company/company.model";
import { Injectable } from "@angular/core";
import { CompanyPagination } from "../../../models/company/company.pag.model";
import { AuthService } from "../../../service/auth.service";
import { UploadImage } from "../../../models/upload.model";
import { DeleteModel } from "../../../models/user/delete_user_model";

@Injectable({ providedIn: "root" })
export class ViewCompanyService extends BaseService {
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

  createCompany(company: Company): Observable<Company> {
    return this.http.post(this.resEndpoint.GetCompanyUri, company).pipe(
      map((response: Company) => response),
      catchError(this.handleError)
    );
  }

  uploadImage(file: File): Observable<UploadImage> {
    const formData: FormData = new FormData();
    formData.append("avatar", file, file.name);
    return this.http
      .post(`${this.resEndpoint.GetCompanyUri}/upload`, formData)
      .pipe(
        map((response: UploadImage) => response),
        catchError(this.handleError)
      );
  }

  getCompanyById(companyId: string): Observable<Company> {
    var url =
      this.resEndpoint.GetCompanyUri + "/" + companyId.replace(/["']/g, "");
    return this.http.get(url, this.httpOptions).pipe(
      tap((response: Company) => {}),
      map((response: Company) => response),
      catchError(this.handleError)
    );
  }

  getCompanyByPagination(
    page: number,
    pageSize: number
  ): Observable<CompanyPagination> {
    return this.http
      .get(
        `${this.resEndpoint.GetCompanyUri}?page=${page}&pageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(
        tap((response: CompanyPagination) =>
          console.log(`Response: ${JSON.stringify(response)}`)
        ),
        map((response: CompanyPagination) => response),
        catchError(this.handleError)
      );
  }

  getCompanyImage() {
    return `${this.resEndpoint.GetCompanyUri}/image`;
  }

  deleteCompany(companyId: string): Observable<DeleteModel> {
    return this.http
      .delete(
        `${this.resEndpoint.GetCompanyUri}/${companyId}`,
        this.httpOptions
      )
      .pipe(
        map((response: DeleteModel) => response),
        catchError(this.handleError)
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http
      .patch(`${this.resEndpoint.GetCompanyUri}`, company, this.httpOptions)
      .pipe(
        map((response: Company) => response),
        catchError(this.handleError)
      );
  }
}
