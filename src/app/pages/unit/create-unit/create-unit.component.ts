import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { CreateUnitService } from "../../../pages/unit/create-unit/create_unit.service";
import { Units } from "../../../models/units/units.model";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { lastValueFrom } from "rxjs";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-unit",
  templateUrl: "./create-unit.component.html",
  styleUrls: ["./create-unit.component.css"],
})
export class CreateUnitComponent implements OnInit {
  @ViewChild("unitForm") unitForm!: NgForm;

  busy: boolean = true;
  userId!: string;
  companyId!: string;
  storedUserType!: string;
  companies?: Company[];
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;

  unit: Units = new Units({});

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    shortname: new FormControl("", [Validators.required]),
    baseunit: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private router: Router,

    private apiService: CreateUnitService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService
  ) {}

  onStatusChange(event: any) {
    this.unit.status = event.target.checked;
  }

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

  createUnit(unit: Units) {
    return lastValueFrom(this.apiService.saveUnit(unit));
  }

  onSubmit() {
    if (this.unitForm.valid) {
      this.busy = true;
      this.unit.name = this.form.get("name")?.value!;
      this.unit.shortname = this.form.get("shortname")?.value!;
      this.unit.baseUnit = this.form.get("baseunit")?.value!;
      this.unit.status = this.form.get("status")?.value!;
      this.unit.companyId = this.form.get("companyId")?.value!;
      this.unit.userId = this.userId;
      this.createUnit(this.unit)
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
