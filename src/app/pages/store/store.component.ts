import { Component, ViewChild } from "@angular/core";
import { StoreService } from "./store.service";
import { firstValueFrom, lastValueFrom } from "rxjs";

import { SearchResult } from "../../interfaces/search-result";
import { Store } from "../../models/store/store.model";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../service/storage.service";
import { KeyService } from "../../service/key.service";
import Swal from "sweetalert2";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"],
})
export class StoreComponent {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  stores?: Store[];
  busy: boolean = true;
  imgUrl!: string;
  store?: Store;
  searchStoreTerm: string = "";
  claims: any;
  userType!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private storeService: StoreService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.imgUrl = this.storeService.getStoreImage();
    this.companyId = this.authService.getCompanyId;
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllStores();
    }
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;

    if (this.pageSize == 20) {
      this.page = Math.round(this.page / 2);

      if (this.page % 10 == 0) {
        this.startPage = this.page - 9;
        this.endPage = this.page;
      } else {
        this.startPage = this.page - (this.page % 10) + 1;
        this.endPage = this.startPage + 9;
      }

      if (this.endPage > this.pages.length / 2) {
        this.endPage = Math.round(this.pages.length / 2);
      } else {
        this.endPage = this.startPage + 9;
      }
    } else if (this.pageSize == 10) {
      this.page = this.page * 2 - 1;
      this.startPage = this.page - (this.page % 10) + 1;
      this.endPage = this.startPage + 9;

      if (this.endPage > this.pages.length * 2) {
        this.endPage = this.pages.length * 2;
      } else {
        this.endPage = this.startPage + 9;
      }
    }
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllStores();
    }
  }

  setPageRangeSubtract(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (page === 1) {
        this.startPage = this.page;
        this.endPage = this.startPage + 9;
      } else {
        if (this.endPage === this.pages.length) {
          this.endPage = this.endPage - (this.endPage % 10);
          this.startPage = this.endPage - 9;
        } else {
          this.startPage -= 10;
          this.endPage -= 10;
        }
      }
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getStoresByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllStores();
      }
    }
  }

  setPageRangeAdd(page: number) {
    if (page >= 1 && page < this.pages.length) {
      this.page = page + 10;
      if (this.page >= this.pages.length) {
        page = this.pages.length;
        this.page = this.pages.length;
        this.endPage = this.pages.length;
        if (this.endPage % 10 === 0) this.startPage = this.endPage - 9;
        else this.startPage = this.pages.length - (this.pages.length % 10) + 1;
      } else {
        this.startPage += 10;
        this.endPage += 10;
        if (this.endPage > this.pages.length) this.endPage = this.pages.length;
      }
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getStoresByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllStores();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;

      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getStoresByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllStores();
      }
    }
  }

  public getStores(): Promise<any> {
    return firstValueFrom(
      this.storeService.getStores(this.page, this.pageSize)
    );
  }

  getAllStores(): void {
    this.busy = true;
    this.getStores()
      .then(
        (result: SearchResult) => {
          if (this.stores?.length === 0) {
            this.stores = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.stores = [];
            this.stores = result.data;
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

  getStoresByCompanyId(companyId: string) {
    this.busy = true;
    return lastValueFrom(
      this.storeService.getStoresByCompanyId(
        companyId,
        this.page,
        this.pageSize
      )
    )
      .then(
        (result) => {
          if (this.stores?.length === 0) {
            this.stores = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.stores = [];
            this.stores = result.data;
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

  goCreateStore() {
    this.route.navigate(["store/create"]);
  }

  goEditStore(store: Store) {
    this.route.navigate(["store/edit"]);
    this.storageService.setData(this.keyService.STORE_KEY, store);
  }

  view(store: Store) {
    this.store = store;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {},
        (reason) => {}
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

  public deleteStore(id: string): Promise<any> {
    return firstValueFrom(this.storeService.delete(id));
  }

  delete(store: Store) {
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
        this.deleteStore(store.id)
          .then(
            (result) => {
              this.stores = this.stores?.filter((stor) => stor !== store);
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
