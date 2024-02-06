import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { ListOfTax } from "../../models/tax/tax_list.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { firstValueFrom } from "rxjs";
import { SearchResult } from "../../interfaces/search-result";
import { KeyService } from "../../service/key.service";
import { StorageService } from "../../service/storage.service";
import Swal from "sweetalert2";
import { AllTaxService } from "./tax.service";

@Component({
  selector: "app-tax",
  templateUrl: "./tax.component.html",
  styleUrls: ["./tax.component.css"],
})
export class TaxComponent {
  searchTaxTerm: string = "";

  busy: boolean = true;
  pages: number[] = [];
  taxs: ListOfTax[] = [];
  tax!: ListOfTax;
  page = 1;
  pageSize = 10;
  claims: any;
  usertype!: string;
  checkUserType!: boolean;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;

  constructor(
    private taxServices: AllTaxService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService
  ) {}
  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.checkUserTypeFunction(this.usertype);
    this.get();
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
    this.get();
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
      this.get();
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
      this.get();
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      this.get();
    }
  }

  goCreateTax() {
    this.route.navigate(["pages/create-tax"]);
  }

  goEditTax(tax: ListOfTax) {
    this.route.navigate(["pages/edit-tax"]);
    this.storageService.setData(this.keyService.Tax_KEY, tax);
  }

  checkUserTypeFunction(usertype: string) {
    if (usertype == "POS Owner") this.checkUserType = true;
    else this.checkUserType = false;
  }

  public getTax(): Promise<any> {
    return firstValueFrom(this.taxServices.getTax(this.page, this.pageSize));
  }

  get(): void {
    this.busy = true;
    this.getTax()
      .then(
        (result: SearchResult) => {
          if (this.taxs?.length === 0) {
            this.taxs = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.taxs = [];
            this.taxs = result.data;
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

  view(tax: ListOfTax) {
    this.tax = tax;
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

  public deleteTax(id: string): Promise<any> {
    return firstValueFrom(this.taxServices.delete(id));
  }

  delete(taxs: ListOfTax) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      this.busy = true;
      if (result.isConfirmed) {
        this.deleteTax(taxs.id)
          .then(
            (result) => {
              this.taxs = this.taxs.filter((tax) => tax !== taxs);
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
