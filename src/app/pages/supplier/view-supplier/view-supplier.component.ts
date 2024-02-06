import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SupplierService } from "../supplier.service";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { firstValueFrom } from "rxjs";
import { SearchResult } from "../../../interfaces/search-result";
import { Supplier } from "../../../models/supplier/supllier.model";
import { AuthService } from "../../../service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-supplier",
  templateUrl: "./view-supplier.component.html",
  styleUrls: ["./view-supplier.component.css"],
})
export class ViewSupplierComponent implements OnInit {
  supplierData!: Supplier[];
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;
  busy: boolean = true;
  supplier!: Supplier;
  searchSupplierTerm: string = "";
  claims: any;
  usertype!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private router: Router,
    private supplierService: SupplierService,
    private messageService: MessageService,
    private toastService: ToastService,
    private storageService: StorageService,
    private keyService: KeyService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.companyId = this.authService.getCompanyId;
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getSuppliersbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllSuppliers();
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
      this.getSuppliersbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllSuppliers();
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
        this.getSuppliersbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllSuppliers();
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
        this.getSuppliersbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllSuppliers();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getSuppliersbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllSuppliers();
      }
    }
  }
  createSupplier() {
    this.router.navigate(["/supplier/create"]);
  }

  editSupplier(supplier: Supplier) {
    this.router.navigate(["/supplier/edit"]);
    this.storageService.setData(this.keyService.SUPPLIER_KEY, supplier);
  }

  getAllSuppliers(): void {
    this.busy = true;
    this.getSupplier()
      .then(
        (result: SearchResult) => {
          if (this.supplierData?.length === 0) {
            this.supplierData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.supplierData = [];
            this.supplierData = result.data;
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

  getSuppliersbyCompany() {
    this.busy = true;
    return firstValueFrom(
      this.supplierService.getSuppliersbyCompany(
        this.page,
        this.pageSize,
        this.companyId
      )
    )
      .then(
        (result) => {
          if (this.supplierData?.length === 0) {
            this.supplierData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.supplierData = [];
            this.supplierData = result.data;
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

  public getSupplier(): Promise<any> {
    return firstValueFrom(
      this.supplierService.getSuppliers(this.page, this.pageSize)
    );
  }

  view(supplier: Supplier) {
    this.supplier = supplier;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  public deleteSupplier(id: string): Promise<any> {
    return firstValueFrom(this.supplierService.delete(id));
  }

  delete(supplier: Supplier) {
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
        this.deleteSupplier(supplier.id)
          .then(
            (result) => {
              this.supplierData = this.supplierData.filter(
                (supp) => supp !== supplier
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
}
