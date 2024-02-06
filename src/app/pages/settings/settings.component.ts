import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResourceEndpointService } from "../../endpoints/resource-endpoint.service";
import { StorageService } from "../../service/storage.service";
import { KeyService } from "../../service/key.service";
import { AuthService } from "../../service/auth.service";
import { SearchResult } from "../../interfaces/search-result";
import { firstValueFrom } from "rxjs";
import { AllSettingsService } from "./settings.service";
import { SettingsList } from "../../models/settings/settings_list.model";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent {
  searchTerm: string = "";

  busy: boolean = true;
  pages: number[] = [];
  settings: SettingsList[] = [];
  setting!: SettingsList;
  page = 1;
  pageSize = 10;
  claims: any;
  usertype!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;

  constructor(
    private settingsServices: AllSettingsService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private resourceEndpointService: ResourceEndpointService,
    private storageService: StorageService,
    private authService: AuthService,
    private keyService: KeyService
  ) {}
  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.companyId = this.authService.getCompanyId;
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getSettingsbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllSettings();
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
      this.getSettingsbyCompany();
    } else if (this.usertype == "POS Owner") {
      this.getAllSettings();
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
        this.getSettingsbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllSettings();
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
        this.getSettingsbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllSettings();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getSettingsbyCompany();
      } else if (this.usertype == "POS Owner") {
        this.getAllSettings();
      }
    }
  }

  goCreateSetting() {
    this.route.navigate(["pages/create-settings"]);
  }

  goEditSetting(setting: SettingsList) {
    this.route.navigate(["pages/edit-settings"]);
    this.storageService.setData(this.keyService.SETTINGS_KEY, setting);
  }

  public getSettings(): Promise<any> {
    return firstValueFrom(
      this.settingsServices.getSettings(this.page, this.pageSize)
    );
  }

  getAllSettings(): void {
    this.busy = true;
    this.getSettings()
      .then(
        (result: SearchResult) => {
          if (this.settings?.length === 0) {
            this.settings = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.settings = [];
            this.settings = result.data;
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

  getSettingsbyCompany() {
    this.busy = true;
    return firstValueFrom(
      this.settingsServices.getSettingsbyCompany(
        this.page,
        this.pageSize,
        this.companyId
      )
    )
      .then(
        (result) => {
          if (this.settings?.length === 0) {
            this.settings = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.settings = [];
            this.settings = result.data;
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

  view(settings: SettingsList) {
    this.setting = settings;
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
}
