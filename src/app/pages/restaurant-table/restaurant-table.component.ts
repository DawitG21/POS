import { Component, ViewChild, OnInit } from "@angular/core";
import { RestaurantTableService } from "./restaurant-table.service";
import { firstValueFrom } from "rxjs";
import { RestaurantTable } from "../../models/restaurant-table/restaurant-table.model";
import { SearchResult } from "../../interfaces/search-result";

import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../service/storage.service";
import { KeyService } from "../../service/key.service";
import Swal from "sweetalert2";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-restaurant-table",
  templateUrl: "./restaurant-table.component.html",
  styleUrls: ["./restaurant-table.component.css"],
})
export class RestaurantTableComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  restaurantTables!: RestaurantTable[];
  busy: boolean = true;
  claims: any;
  companyId!: string;
  usertype!: string;
  searchRestaurantTableTerm: string = "";
  startPage = 1;
  endPage = 10;

  restaurantTable!: RestaurantTable;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private restaurantTableService: RestaurantTableService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.companyId = this.authService.getCompanyId;
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getRestaurantTablesbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllRestaurantTables();
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
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getRestaurantTablesbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllRestaurantTables();
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
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getRestaurantTablesbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllRestaurantTables();
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
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getRestaurantTablesbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllRestaurantTables();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getRestaurantTablesbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllRestaurantTables();
      }
    }
  }

  public getRestaurantTables(): Promise<any> {
    return firstValueFrom(
      this.restaurantTableService.getRestaurantTables(this.page, this.pageSize)
    );
  }

  getAllRestaurantTables() {
    this.busy = true;
    this.getRestaurantTables()
      .then(
        (result: SearchResult) => {
          if (this.restaurantTables?.length === 0) {
            this.restaurantTables = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.restaurantTables = [];
            this.restaurantTables = result.data;
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

  getRestaurantTablesbyCompany() {
    this.busy = true;
    return firstValueFrom(
      this.restaurantTableService.getRestaurantTablesByCompany(
        this.page,
        this.pageSize,
        this.companyId
      )
    )
      .then(
        (result) => {
          if (this.restaurantTables?.length === 0) {
            this.restaurantTables = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.restaurantTables = [];
            this.restaurantTables = result.data;
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

  goCreateRestaurantTable() {
    this.route.navigate(["restaurant-table/create"]);
  }

  goEditRestaurantTable(restaurantTable: RestaurantTable) {
    this.route.navigate(["restaurant-table/edit"]);
    this.storageService.setData(
      this.keyService.RESTAURANT_TABLE_KEY,
      restaurantTable
    );
  }

  view(restaurantTable: RestaurantTable) {
    this.restaurantTable = restaurantTable;
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

  public deleteRestaurantTable(id: string): Promise<any> {
    return firstValueFrom(this.restaurantTableService.delete(id));
  }

  delete(restaurantTable: RestaurantTable) {
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
        this.deleteRestaurantTable(restaurantTable.id)
          .then(
            (result) => {
              this.restaurantTables = this.restaurantTables.filter(
                (table) => table !== restaurantTable
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
