import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { StorageService } from "../../service/storage.service";
import { KeyService } from "../../service/key.service";
import Swal from "sweetalert2";
import { ListOfUnits } from "../../models/units/units_list.model";
import { SearchResult } from "../../interfaces/search-result";
import { firstValueFrom } from "rxjs";
import { AllUnitService } from "./unit.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.css"],
})
export class UnitComponent {
  searchTerm: string = "";

  busy: boolean = true;
  pages: number[] = [];
  units: ListOfUnits[] = [];
  unit!: ListOfUnits;
  page = 1;
  pageSize = 10;
  claims: any;
  userType!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;

  constructor(
    private unitServices: AllUnitService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private resourceEndpointService: ResourceEndpointService,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.companyId = this.authService.getCompanyId;
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getUnitsbyCompany();
    } else if (this.userType == "POS Owner") {
      this.getAllUnits();
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

      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getUnitsbyCompany();
      } else if (this.userType == "POS Owner") {
        this.getAllUnits();
      }
    }
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getUnitsbyCompany();
    } else if (this.userType == "POS Owner") {
      this.getAllUnits();
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
        this.getUnitsbyCompany();
      } else if (this.userType == "POS Owner") {
        this.getAllUnits();
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
        this.getUnitsbyCompany();
      } else if (this.userType == "POS Owner") {
        this.getAllUnits();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getUnitsbyCompany();
      } else if (this.userType == "POS Owner") {
        this.getAllUnits();
      }
    }
  }

  goCreateUnit() {
    this.route.navigate(["pages/create-unit"]);
  }

  goEditUnit(unit: ListOfUnits) {
    this.route.navigate(["pages/edit-unit"]);
    this.storageService.setData(this.keyService.UNIT_KEY, unit);
  }

  public getUnits(): Promise<any> {
    return firstValueFrom(this.unitServices.getUnits(this.page, this.pageSize));
  }

  getAllUnits(): void {
    this.busy = true;
    this.getUnits()
      .then(
        (result: SearchResult) => {
          if (this.units?.length === 0) {
            this.units = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.units = [];
            this.units = result.data;
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

  getUnitsbyCompany() {
    this.busy = true;
    return firstValueFrom(
      this.unitServices.getUnitsbyCompany(
        this.page,
        this.pageSize,
        this.companyId
      )
    )
      .then(
        (result) => {
          if (this.units?.length === 0) {
            this.units = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.units = [];
            this.units = result.data;
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

  view(unit: ListOfUnits) {
    this.unit = unit;
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

  public deleteUnit(id: string): Promise<any> {
    return firstValueFrom(this.unitServices.delete(id));
  }

  delete(units: ListOfUnits) {
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
        this.deleteUnit(units.id)
          .then(
            (result) => {
              this.units = this.units.filter((unit) => unit !== units);
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
