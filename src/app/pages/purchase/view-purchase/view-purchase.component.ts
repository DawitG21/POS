import { Component, OnInit, ViewChild } from "@angular/core";
import { PurchaseService } from "../purchase.service";
import { firstValueFrom, lastValueFrom } from "rxjs";

import { SearchResult } from "../../../interfaces/search-result";
import { Purchase } from "../../../models/purchase/purchase.model";
import { Router } from "@angular/router";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-purchase",
  templateUrl: "./view-purchase.component.html",
  styleUrls: ["./view-purchase.component.css"],
})
export class ViewPurchaseComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  purchaseDate?: Purchase[];
  busy: boolean = true;
  imgUrl!: string;
  purchase!: Purchase;
  searchPurchaseTerm: string = "";
  claims: any;
  userType!: string;
  companyId!: string;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private purchaseService: PurchaseService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.companyId = this.storageService.getData(this.keyService.COMPANYID_KEY);
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getPurchaseByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllPurchase();
    }
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getPurchaseByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllPurchase();
    }
  }

  setCurrentPage(page: number) {
    // Ensure the clicked page is within the valid range
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getPurchaseByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllPurchase();
      }
    }
  }

  public getPuchases(): Promise<any> {
    return firstValueFrom(
      this.purchaseService.getPurchases(this.page, this.pageSize)
    );
  }

  getAllPurchase(): void {
    this.busy = true;
    this.getPuchases()
      .then(
        (result: SearchResult) => {
          if (this.purchaseDate?.length === 0) {
            this.purchaseDate = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.purchaseDate = [];
            this.purchaseDate = result.data;
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

  getPurchaseByCompanyId(companyId: string) {
    this.busy = true;
    return lastValueFrom(
      this.purchaseService.getPurchaseByCompany(
        this.page,
        this.pageSize,
        companyId
      )
    )
      .then(
        (result) => {
          if (this.purchaseDate?.length === 0) {
            this.purchaseDate = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.purchaseDate = [];
            this.purchaseDate = result.data;
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

  goCreatePurchase() {
    this.route.navigate(["purchase/create"]);
  }

  goEditPurchase(purchase: Purchase) {
    this.route.navigate(["purchase/edit"]);
    this.storageService.setData(this.keyService.PURCHASE_KEY, purchase);
  }

  view(purchase: Purchase) {
    this.purchase = purchase;
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

  public deletePurchase(id: string): Promise<any> {
    return firstValueFrom(this.purchaseService.delete(id));
  }

  delete(purchase: Purchase) {
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
        this.deletePurchase(purchase.transactionId)
          .then(
            (result) => {
              this.purchaseDate = this.purchaseDate?.filter(
                (purch) => purch !== purchase
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
