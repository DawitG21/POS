import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "../../../models/customer/customer.model";
import { CustomerService } from "../customer.service";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { firstValueFrom } from "rxjs";
import Swal from "sweetalert2";
import { SearchResult } from "../../../interfaces/search-result";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-view-customer",
  templateUrl: "./view-customer.component.html",
  styleUrls: ["./view-customer.component.css"],
})
export class ViewCustomerComponent implements OnInit {
  customerData!: Customer[];
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;
  busy: boolean = true;
  customer!: Customer;
  searchCustomerTerm: string = "";
  claims: any;
  usertype!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private messageService: MessageService,
    private toastService: ToastService,
    private storageService: StorageService,
    private keyService: KeyService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.companyId = this.authService.getCompanyId;

    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getCustomersbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllCustomers();
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
      this.getCustomersbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllCustomers();
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
        this.getCustomersbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllCustomers();
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
        this.getCustomersbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllCustomers();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getCustomersbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllCustomers();
      }
    }
  }

  getAllCustomers(): void {
    this.busy = true;
    this.getCustomer()
      .then(
        (result: SearchResult) => {
          if (this.customerData?.length === 0) {
            this.customerData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.customerData = [];
            this.customerData = result.data;
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

  getCustomersbyCompany() {
    this.busy = true;
    return firstValueFrom(
      this.customerService.getCustomersbyCompany(
        this.page,
        this.pageSize,
        this.companyId
      )
    )
      .then(
        (result) => {
          if (this.customerData?.length === 0) {
            this.customerData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.customerData = [];
            this.customerData = result.data;
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

  createCustomer() {
    this.router.navigate(["/customer/create"]);
  }

  editCustomer(customer: Customer) {
    this.router.navigate(["/customer/edit"]);
    this.storageService.setData(this.keyService.CUSTOMER_KEY, customer);
  }

  view(customer: Customer) {
    this.customer = customer;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  public deleteCustomer(id: string): Promise<any> {
    return firstValueFrom(this.customerService.delete(id));
  }

  delete(customer: Customer) {
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
        this.deleteCustomer(customer.id)
          .then(
            (result) => {
              this.customerData = this.customerData.filter(
                (cust) => cust !== customer
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

  formatDateToCustomFormat(dateString: string): string {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  public getCustomer(): Promise<any> {
    return firstValueFrom(
      this.customerService.getCustomers(this.page, this.pageSize)
    );
  }
}
