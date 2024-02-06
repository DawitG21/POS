import { Component, ViewChild, OnInit } from '@angular/core';
import { UserTypeService } from './usertypes.service';
import { firstValueFrom } from 'rxjs';

import { SearchResult } from '../../interfaces/search-result';
import { UserType } from '../../models/usertypes/usertype.model'
import { Router } from '@angular/router';
import { MessageService } from '../../service/message.service';
import { ToastService } from '../../service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceEndpointService } from '../../endpoints/resource-endpoint.service';
import { StorageService } from '../../service/storage.service';
import { KeyService } from '../../service/key.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usertypes',
  templateUrl: './usertypes.component.html',
  styleUrls: ['./usertypes.component.css']
})

  export class UsertypesComponent implements OnInit {
    pages: number[] = [];
    page = 1;
    pageSize = 10;
    userTypes?: UserType[];
    busy: boolean = true;
    userType?: UserType;
    searchUserTypeTerm: string = "";
    claims: any;
    startPage = 1;
    endPage = 10;
  
    @ViewChild('viewModal') viewModal: any;
    constructor(
      private userTypeService: UserTypeService,
      public route: Router,
      private messageService: MessageService,
      private toastService: ToastService,
      private modalService: NgbModal,
      private resourceEndpointService: ResourceEndpointService,
      private storageService: StorageService,
      private keyService: KeyService
    ) {}
  
    ngOnInit() {
      this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
      this.get();
    }
  
    setPageSize(event: any) {
      const selectedValue = event.target.value;
      this.pageSize = selectedValue;
  
      if(this.pageSize == 20)
      {
        this.page = Math.round(this.page/2);
  
        if(this.page%10 == 0) {
          this.startPage = this.page - 9;
          this.endPage = this.page;
        }
        else {
          this.startPage = this.page - this.page%10 + 1;
          this.endPage = this.startPage + 9;
        }
  
        if(this.endPage > this.pages.length/2) {
          this.endPage = Math.round(this.pages.length/2);
        }
        else {
          this.endPage = this.startPage + 9;
        }
      }
      else if (this.pageSize == 10)
      {
        this.page = this.page*2 - 1;
        this.startPage = this.page - this.page%10 + 1;
        this.endPage = this.startPage + 9;
  
        if(this.endPage > this.pages.length*2) {
          this.endPage = this.pages.length*2;
        }
        else {
          this.endPage = this.startPage + 9;
        }
      }
    
      // console.log("Page" + this.page);
      // console.log("Start Page" + this.startPage);
      // console.log("End Page" + this.endPage);
      this.get();   
    }
    
  
    setPageRangeSubtract(page:number) {
      if (page >= 1 && page <= this.pages.length) {
        this.page = page;
        if(page === 1)
        {
          this.startPage = this.page;
          this.endPage = this.startPage + 9;
        }
        else
        {
          if(this.endPage === this.pages.length)
          {
            this.endPage = this.endPage - this.endPage%10;
            this.startPage = this.endPage - 9;
          }
          else
          {
            this.startPage -= 10;
            this.endPage -= 10;
          }
        }
        //this.getUsersPagination(this.page, this.pageSize);
        this.get();      //console.log(this.startPage, this.endPage);
        //console.log(this.page);
      }
    }
  
    setPageRangeAdd(page:number) {
      if (page >= 1 && page < this.pages.length) {
        this.page = page + 10;
        if(this.page >= this.pages.length)
        {
          page = this.pages.length;
          this.page = this.pages.length;
          this.endPage = this.pages.length;
          if(this.endPage%10 === 0)
            this.startPage = this.endPage - 9;
          else
            this.startPage = this.pages.length - this.pages.length%10 + 1;
        }
        else
        {
          this.startPage += 10;
          this.endPage += 10;
          if(this.endPage > this.pages.length)
            this.endPage = this.pages.length;
        }
        //this.getUsersPagination(this.page, this.pageSize);
        this.get();      //console.log(this.startPage, this.endPage);
        //console.log(this.page);
      }
    }
  
    setCurrentPage(page: number) {
      // Ensure the clicked page is within the valid range
      if (page >= 1 && page <= this.pages.length) {
        this.page = page;
        //this.getUsersPagination(this.page, this.pageSize);
        this.get();    
      }
      //console.log(this.page);
    }

    public getUserTypes(): Promise<any> {
      return firstValueFrom(this.userTypeService.getUserTypes(this.page, this.pageSize));
    }
    get(): void {
      this.busy = true;
      this.getUserTypes().then((result: SearchResult) => {
        if (this.userTypes?.length === 0) {
          this.userTypes = result.data;
          this.pages = Array.from({ length: result.pages }, (_, index) => index + 1);
  
        } else {
          this.userTypes = [];
          this.userTypes = result.data;
          this.pages = Array.from({ length: result.pages }, (_, index) => index + 1);
        }
      }, (reject) => {
        this.toastService.error(this.messageService.serverError);
      })
        .catch((error) => {
          this.toastService.error(this.messageService.serverError);
        })
        .finally(() => {
          this.busy = false;
        });
    }
  
    goCreateUserType() {
      this.route.navigate(['usertypes/create']);
    }
  
    goEditStore(userType: UserType) {
      this.route.navigate(['usertypes/edit']);
      this.storageService.setData(this.keyService.USERTYPE_KEY, userType);
    }
  
    view(userType: UserType) {
      this.userType = userType;
      // this.userId = user.id!;
      this.modalService.open(this.viewModal, { ariaLabelledBy: 'viewModalLabel' }).result.then(
        (result) => {
          // Handle close (if needed)
        },
        (reason) => {
          // Handle dismiss (if needed)
        }
      );
  
    }
  
    formatDateToCustomFormat(dateString: string): string {
      const dateObject = new Date(dateString);
  
      const formattedDate = dateObject.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
  
      return formattedDate;
    }
  
}
