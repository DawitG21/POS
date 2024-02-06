import { Component, OnInit, ViewChild } from "@angular/core";
import { Company } from "../../../models/company/company.model";
import { lastValueFrom } from "rxjs";
import { ViewCompanyService } from "../view-company/view_company.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-view-company",
  templateUrl: "./view-company.component.html",
  styleUrls: ["./view-company.component.css"],
})
export class ViewCompanyComponent implements OnInit {
  pages: number[] = [];
  companies?: Company[];
  company?: Company;
  page: number = 1;
  pageSize: number = 10;
  imageUrl!: string;
  busy: boolean = true;
  searchCompanyTerm: string = "";
  claims: any;
  companyId!: string;
  userType!: string;
  startPage = 1;
  endPage = 10;
  @ViewChild("viewModal") viewModal: any;

  constructor(
    private viewCompanyService: ViewCompanyService,
    private router: Router,
    private toastService: ToastService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService
  ) {
    this.imageUrl = this.viewCompanyService.getCompanyImage();
  }

  ngOnInit(): void {
    this.companyId = this.authService.getCompanyId;
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    if (this.userType == "POS Owner") {
      this.getCompanywithPagination();
    }
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getCompanyById(this.companyId);
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
    this.getCompanywithPagination();
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
      this.getCompanywithPagination();
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
      this.getCompanywithPagination();
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      this.getCompanywithPagination();
    }
  }

  getCompanyById(companyId: string) {
    this.busy = true;
    this.companies = [];
    return lastValueFrom(this.viewCompanyService.getCompanyById(companyId))
      .then(
        (result) => {
          this.companies?.push(result);
        },
        (reject) => {}
      )
      .catch((error) => {})
      .finally(() => {
        this.busy = false;
      });
  }

  getCompanywithPagination() {
    this.busy = true;
    return lastValueFrom(
      this.viewCompanyService.getCompanyByPagination(this.page, this.pageSize)
    )
      .then(
        (result) => {
          if (this.companies?.length === 0) {
            this.companies = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.companies = [];
            this.companies = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          }
        },
        (reject) => {}
      )
      .catch((error) => {})
      .finally(() => {
        this.busy = false;
      });
  }

  getCompany() {
    return lastValueFrom(this.viewCompanyService.getCompanyById(this.companyId))
      .then(
        (result) => {},
        (reject) => {}
      )
      .catch((error) => {})
      .finally(() => {});
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

  createCompany() {
    this.router.navigate(["company/create-company"]);
  }

  view(company: Company) {
    this.company = company;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  update(company: Company) {
    this.storageService.setData(this.keyService.COMPANYOBJECT_KEY, company);
    this.router.navigate(["company/edit-company"]);
  }

  deleteCompany(companyId: string) {
    return lastValueFrom(this.viewCompanyService.deleteCompany(companyId));
  }

  delete(company: Company) {
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
        this.deleteCompany(company.id!)
          .then(
            (result) => {
              this.companies = this.companies?.filter(
                (comp) => comp !== company
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
