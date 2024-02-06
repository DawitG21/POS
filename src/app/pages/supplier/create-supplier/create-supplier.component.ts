import { Component, OnInit } from "@angular/core";

import { SupplierCreate } from "../../../models/supplier/suppllier-create.model";
import { Address } from "../../../models/address.model";
import { Phone } from "../../../models/phone.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { SupplierService } from "../supplier.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { Location } from "@angular/common";
import { Company } from "../../../models/company/company.model";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-supplier",
  templateUrl: "./create-supplier.component.html",
  styleUrls: ["./create-supplier.component.css"],
})
export class CreateSupplierComponent implements OnInit {
  [x: string]: any;

  model!: SupplierCreate;
  address!: Address;
  phone!: Phone;
  code!: string;
  number!: number;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  companies?: Company[];
  storedUserType!: string;
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl([
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^251\d{9}$/),
    ]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
  });

  constructor(
    private supplierService: SupplierService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private authService: AuthService,
    private viewCompanyService: ViewCompanyService,
  ) {}
  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(this.keyService.USERTYPE_NAME);
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
    ).then(
      (result) => {
        if (this.companies?.length === 0) {
          this.companies = result.data;
          this.pages = Array.from({ length: result.pages }, (_, index) => index + 1);

        } else {
          this.companies = [];
          this.companies = result.data;
          this.pages = Array.from({ length: result.pages }, (_, index) => index + 1);
        }
      }, (reject) => {
      }).catch((error) => {
      }).finally(() => {
        this.busy = false;
      });
  }

  getCompaniesByCompanyId(companyId: string) {
    return lastValueFrom(
      this.viewCompanyService.getCompanyById(companyId)
    ).then(
      (result) => {
        this.companies = [];
        this.companies.push(result);
      }, (reject) => {
      }).catch((error) => {
      }).finally(() => {
        this.busy = false;
      });
  }

  create(supplier: SupplierCreate) {
    return lastValueFrom(this.supplierService.createSupplier(supplier));
  }

  save() {
    this.busy = true;
    const cityValue = `${this.form.get("city")?.value}`;
    const countryValue = `${this.form.get("country")?.value}`;
    const phoneNumber = `${this.form.get("phoneNumber")?.value}`;

    this.model = new SupplierCreate();
    if (typeof phoneNumber === "string") {
      this.code = `+${phoneNumber.slice(0, 3)}`;

      this.number = Number(phoneNumber.slice(3));
    }

    this.address = new Address(cityValue, countryValue);
    this.phone = new Phone(this.code, this.number);
    this.model.address = this.address;
    this.model.phone = this.phone;
    this.model.userId = this.userId;
    this.model.companyId = this.form.get('companyId')!.value!;
    this.model.status = this.form.get("status")!.value!;
    this.model.name = this.form.get("name")?.value!;

    this.create(this.model)
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

  goBack() {
    this.location.back();
  }
}
