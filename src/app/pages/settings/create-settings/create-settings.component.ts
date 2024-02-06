import { Component, ViewChild } from "@angular/core";
import { NgForm, Validators, FormGroup, FormControl } from "@angular/forms";
import { CreateSettingsService } from "../../../pages/settings/create-settings/create_settings.service";
import { Settings } from "../../../models/settings/settings.model";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Company } from "../../../models/company/company.model";
import { lastValueFrom } from "rxjs";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-settings",
  templateUrl: "./create-settings.component.html",
  styleUrls: ["./create-settings.component.css"],
})
export class CreateSettingsComponent {
  @ViewChild("settingForm") settingForm!: NgForm;

  busy: boolean = true;
  userId!: string;
  companyId!: string;
  storedUserType!: string;
  companies?: Company[];
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;
  setting: Settings = new Settings({});

  form = new FormGroup({
    cashonhand: new FormControl("", [Validators.required]),
    discount: new FormControl("", [Validators.required]),
    vat: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    accountspayable: new FormControl("", [Validators.required]),
    accountsreceivable: new FormControl("", [Validators.required]),
    salesrevenue: new FormControl("", [Validators.required]),
    cogs: new FormControl("", [Validators.required]),
  });

  constructor(
    private router: Router,

    private apiService: CreateSettingsService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.companyId = this.authService.getCompanyId;
    this.validateCalls();
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getAllCompanies();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId);
    }
  }

  getAllCompanies() {
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

  getCompaniesByCompanyId(companyId: string) {
    return lastValueFrom(this.viewCompanyService.getCompanyById(companyId))
      .then(
        (result) => {
          this.companies = [];
          this.companies.push(result);
        },
        (reject) => {}
      )
      .catch((error) => {})
      .finally(() => {
        this.busy = false;
      });
  }

  createSetting(setting: Settings) {
    return lastValueFrom(this.apiService.saveSetting(setting));
  }

  onSubmit() {
    if (this.settingForm.valid) {
      this.busy = true;
      this.setting.cashonhand = +this.form.get("cashonhand")?.value!;
      this.setting.accountsreceivable =
        +this.form.get("accountsreceivable")?.value!;
      this.setting.salesrevenue = +this.form.get("salesrevenue")?.value!;
      this.setting.cogs = this.form.get("cogs")?.value!;
      this.setting.companyId = this.form.get("companyId")?.value!;
      this.setting.userId = this.userId;
      this.setting.accountspayable = +this.form.get("accountspayable")?.value!;
      this.setting.discount = +this.form.get("discount")?.value!;
      this.setting.vat = +this.form.get("vat")?.value!;

      this.createSetting(this.setting)
        .then(
          (result) => {
            this.toastService.success("Success");
            this.form.reset();
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
  }

  goBack() {
    this.location.back();
  }
}
