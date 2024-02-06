import { Component, OnInit, ViewChild } from "@angular/core";

import { PurchaseReturnService } from "../purchase-return.service";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { SearchResult } from "../../../interfaces/search-result";
import { PurchaseReturn } from "../../../models/purchase-return/purchase-return.model";
import { Router } from "@angular/router";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-purchase-return",
  templateUrl: "./view-purchase-return.component.html",
  styleUrls: ["./view-purchase-return.component.css"],
})
export class ViewPurchaseReturnComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  purchaseReturnData?: PurchaseReturn[];
  busy: boolean = true;
  imgUrl!: string;
  purchaseReturn!: PurchaseReturn;
  searchPurchaseReturnTerm: string = "";
  claims: any;
  userType!: string;
  companyId!: string;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private purchaseReturnService: PurchaseReturnService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.companyId = this.storageService.getData(this.keyService.COMPANYID_KEY);
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getPurchaseReturnByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllPurchaseReturn();
    }
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getPurchaseReturnByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllPurchaseReturn();
    }
  }
  setCurrentPage(page: number) {
    // Ensure the clicked page is within the valid range
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getPurchaseReturnByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllPurchaseReturn();
      }
    }
  }

  public getPurchaseReturn(): Promise<any> {
    return firstValueFrom(
      this.purchaseReturnService.getPurchaseReturn(this.page, this.pageSize)
    );
  }

  getAllPurchaseReturn(): void {
    this.busy = true;
    this.getPurchaseReturn()
      .then(
        (result: SearchResult) => {
          if (this.purchaseReturnData?.length === 0) {
            this.purchaseReturnData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.purchaseReturnData = [];
            this.purchaseReturnData = result.data;
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

  getPurchaseReturnByCompanyId(companyId: string) {
    this.busy = true;
    return lastValueFrom(
      this.purchaseReturnService.getPurchaseReturnByCompany(
        this.page,
        this.pageSize,
        companyId
      )
    )
      .then(
        (result) => {
          if (this.purchaseReturnData?.length === 0) {
            this.purchaseReturnData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.purchaseReturnData = [];
            this.purchaseReturnData = result.data;
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

  goCreatePurchaseReturn() {
    this.route.navigate(["purchase-return/create"]);
  }

  goEditPurchaseReturn(purchaseReturn: PurchaseReturn) {
    this.route.navigate(["purchase-return/edit"]);
    this.storageService.setData(
      this.keyService.PURCHASE_RETURN_KEY,
      purchaseReturn
    );
  }

  view(purchaseReturn: PurchaseReturn) {
    this.purchaseReturn = purchaseReturn;
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

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  public deletePurchaseReturn(id: string): Promise<any> {
    return firstValueFrom(this.purchaseReturnService.delete(id));
  }

  delete(purchaseReturn: PurchaseReturn) {
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
        this.deletePurchaseReturn(purchaseReturn.transactionId)
          .then(
            (result) => {
              this.purchaseReturnData = this.purchaseReturnData?.filter(
                (purchret) => purchret !== purchaseReturn
              );
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
