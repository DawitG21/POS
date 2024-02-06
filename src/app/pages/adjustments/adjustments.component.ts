import { Component, OnInit, ViewChild } from "@angular/core";
import { AdjustmentService } from "./adjustment.service";
import { firstValueFrom } from "rxjs";

import { SearchResult } from "../../interfaces/search-result";
import { Adjustments } from "../../models/adjustments/adjustments.model";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../service/storage.service";
import { KeyService } from "../../service/key.service";
import Swal from "sweetalert2";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.css']
})
export class AdjustmentsComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  adjustments?: Adjustments[];
  adjustment!: Adjustments;
  busy: boolean = true;
  searchAdjustmentTerm: string = "";
  claims: any;
  usertype!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private adjustmentService: AdjustmentService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.companyId = this.authService.getCompanyId;
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getAdjustmentsbyCompany();
    }
    else if (this.usertype == "POS Owner") {
      this.getAllAdjustments();
    }
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
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getAdjustmentsbyCompany();
    }
    else if (this.usertype == "POS Owner") {
      this.getAllAdjustments();
    }
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
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getAdjustmentsbyCompany();
      }
      else if (this.usertype == "POS Owner") {
        this.getAllAdjustments();
      }
      //this.getUsersPagination(this.page, this.pageSize);
      // console.log(this.startPage, this.endPage);
      // console.log(this.page);
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
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getAdjustmentsbyCompany();
      }
      else if (this.usertype == "POS Owner") {
        this.getAllAdjustments();
      }
      //this.getUsersPagination(this.page, this.pageSize);
      // console.log(this.startPage, this.endPage);
      // console.log(this.page);
    }
  }

  setCurrentPage(page: number) {
    // Ensure the clicked page is within the valid range
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      //this.getUsersPagination(this.page, this.pageSize);
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getAdjustmentsbyCompany();
      }
      else if (this.usertype == "POS Owner") {
        this.getAllAdjustments();
      }    }
    //console.log(this.page);
  }

  public getAdjustments(): Promise<any> {
    return firstValueFrom(
      this.adjustmentService.getAdjustments(this.page, this.pageSize)
    );
  }

  getAllAdjustments(): void {
    this.busy = true;
    this.getAdjustments()
      .then(
        (result: SearchResult) => {
          if (this.adjustments?.length === 0) {
            this.adjustments = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.adjustments = [];
            this.adjustments = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          }
        },
        (reject) => {
          this.toastService.error(this.messageService.serverError);
        }
      )
      .catch((error) => {
        this.toastService.error(this.messageService.serverError);
      })
      .finally(() => {
        this.busy = false;
      });
  }

  getAdjustmentsbyCompany() {
    this.busy = true;
    return firstValueFrom(
      this.adjustmentService.getAdjustmentsbyCompany(this.page, this.pageSize, this.companyId)
    )
      .then(
        (result) => {
          if (this.adjustments?.length === 0) {
            this.adjustments = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.adjustments = [];
            this.adjustments = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          }

        }, (reject) => {
          this.toastService.error(this.messageService.serverError);
        }
      ).catch((error) => {
        this.toastService.error(this.messageService.serverError);

      }).finally(() => {

        this.busy = false;
      }
      );
  }

  goCreateAdjustment() {
    this.route.navigate(["adjustments/create"]);
  }

  view(adjustment: Adjustments) {
    this.adjustment = adjustment;
    // this.userId = user.id!;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
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

  public goEditAdjustment(adjustment: Adjustments) {
    this.route.navigate(['adjustments/edit']);
    this.storageService.setData(this.keyService.ADJUSTMENTS_KEY, adjustment);
  }

  public deleteAdjustment(id: string): Promise<any> {
    return firstValueFrom(this.adjustmentService.delete(id));
  }

  delete(adjustment: Adjustments) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.busy = true;
        this.deleteAdjustment(adjustment.id)
          .then(
            (result) => {
              this.adjustments = this.adjustments?.filter(adjust => adjust !== adjustment);
              this.toastService.success("Success");
            },
            (reject) => {
              this.toastService.error(this.messageService.serverError);
            }
          )
          .catch((error) => {
            this.toastService.error(this.messageService.serverError);
          })
          .finally(() => {
            this.busy = false;
          });
      }
    });
  }


}
