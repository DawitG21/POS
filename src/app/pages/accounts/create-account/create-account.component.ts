import { Component, ViewChild } from "@angular/core";
import { NgForm, Validators, FormGroup, FormControl } from "@angular/forms";
import { Accounts } from "../../../models/accounts/accounts.model";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { CreateAccountService } from "./create_account.service";

import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Company } from "../../../models/company/company.model";
import { lastValueFrom } from "rxjs";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent {
  @ViewChild("accountForm") accountForm!: NgForm;

  busy: boolean = true;
  userId!: string;
  companyId!: string;
  storedUserType!: string;
  companies?: Company[];
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;

  account: Accounts = new Accounts({});

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    shortname: new FormControl("", [Validators.required]),
    accountType: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private apiService: CreateAccountService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService
  ) {}

  onStatusChange(event: any) {
    this.account.status = event.target.checked;
  }

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.validateCalls();
    this.busy = false;
  }

  validateCalls(): void {
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

  createAccount(account: Accounts) {
    return lastValueFrom(this.apiService.saveAccount(account));
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.busy = true;
      this.account.accountname = this.form.get("name")?.value!;
      this.account.accountnumber = this.form.get("shortname")?.value!;
      this.account.accounttype = this.form.get("accountType")?.value!;
      this.account.status = this.form.get("status")?.value!;
      this.account.companyId = this.form.get("companyId")?.value!;
      this.account.userId = this.userId;

      this.createAccount(this.account)
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
