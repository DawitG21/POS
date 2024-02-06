import { Observable, Subscription } from 'rxjs';
import { BaseService } from '../../../shared/base.service';
import { ResourceEndpointService } from '../../../endpoints/resource-endpoint.service';
import { HttpService } from '../../../service/http.service';
import { ProtectedService } from "../../protected.service";
import { CreateUser } from '../../../models/user/usercreate.model';
import { catchError, map, tap } from 'rxjs/operators';
import { UserPagination } from '../../../models/user/user.pag.model';
import { SearchUser } from '../../../models/user/searchuser.model';
import { DeleteModel } from '../../../models/user/delete_user_model';
import { UploadImage } from "../../../models/upload.model";
import { Injectable } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
    httpOptions: any;
    token: any;
    subscription: Subscription | any;
    //companyId: string;


    constructor(
        private resEndpoint: ResourceEndpointService,
        private http: HttpService,
        private protectedService: ProtectedService,
        private authService: AuthService
    ) {
        super();
        this.token = this.authService.getToken;
        //this.companyId = this.authService.getCompanyId;
        this.httpOptions = this.protectedService.getHttpOptions(this.token);
    }

    createUser(user: CreateUser): Observable<SearchUser> {
        return this.http.post(
            `${this.resEndpoint.GetUserUri}`,
            user,
            this.httpOptions
        ).pipe(
            tap((response: SearchUser) => {
                console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: SearchUser) => response),
            catchError(this.handleError)
        );
    }

    uploadUserImage(file: File): Observable<UploadImage> {
        const formData: FormData = new FormData();
        formData.append('avatar', file, file.name);
        return this.http.post(
            `${this.resEndpoint.GetUserUri}/upload`,
            formData,
            this.protectedService.getHttpOptionsForImage(this.token)
        ).pipe(
            tap((response: any) => {
                console.log(`Response Image: ${JSON.stringify(response)}`);

            }),
            map((response: UploadImage) => response),
            catchError(this.handleError)
        );
    }


    getUsers(page: number, pageSize: number): Observable<UserPagination> {
        return this.http.get(
            `${this.resEndpoint.GetUserUri}?page=${page}&pageSize=${pageSize}`,
            this.httpOptions
        ).pipe(
            tap((response: UserPagination) => {
                console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: UserPagination) => response),
            catchError(this.handleError)
        );
    }

    getUserById(userId: string): Observable<SearchUser> {
        return this.http.get(`${this.resEndpoint.GetUserUri}/${userId}`,
            this.httpOptions
        ).pipe(
            tap((response: SearchUser) => {
                console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: SearchUser) => response),
            catchError(this.handleError)
        );
    }

    getUserImage() {
        // `.../imageName`
        return `${this.resEndpoint.GetUserUri}/image`;

    }



    getUserByCompanyId(companyId: string, page: number, pageSize: number): Observable<UserPagination> {
        return this.http.get(
            `${this.resEndpoint.GetUserUri}/company/${companyId}?page=${page}&pageSize=${pageSize}`,
            this.httpOptions
        ).pipe(
            tap((response: UserPagination) => {
                //console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: UserPagination) => response),
            catchError(this.handleError)
        );
    }

    getUserByRoleId(roleId: string, page: number, pageSize: number): Observable<UserPagination> {
        return this.http.get(
            `${this.resEndpoint.GetUserUri}/role/${roleId}?page=${page}&pageSize=${pageSize}`,
            this.httpOptions
        ).pipe(
            tap((response: UserPagination) => {
                console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: UserPagination) => response),
            catchError(this.handleError)
        );
    }

    updateUser(user: CreateUser): Observable<CreateUser> {
        return this.http.patch(
            `${this.resEndpoint.GetUserUri}`,
            user,
            this.httpOptions
        ).pipe(
            tap((response: CreateUser) => {
                console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: CreateUser) => response),
            catchError(this.handleError)
        );
    }

    deleteUser(userId: string): Observable<DeleteModel> {
        return this.http.delete(
            `${this.resEndpoint.GetUserUri}/${userId}`,
            this.httpOptions
        ).pipe(
            tap((response: DeleteModel) => {
                console.log(`Response: ${JSON.stringify(response)}`);
            }),
            map((response: DeleteModel) => response),
            catchError(this.handleError)
        );
    }

}