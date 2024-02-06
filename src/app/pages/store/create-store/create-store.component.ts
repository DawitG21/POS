import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { StoreCreate } from "../../../models/store/store-create.model";
import { Address } from "../../../models/address.model";
import { Phone } from "../../../models/phone.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { StoreService } from "../store.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { UserType } from "../../../models/usertypes/usertype.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-store",
  templateUrl: "./create-store.component.html",
  styleUrls: ["./create-store.component.css"],
})
export class CreateStoreComponent implements OnInit {
  [x: string]: any;

  model: StoreCreate = new StoreCreate();
  address!: Address;
  phone!: Phone;
  code!: string;
  number!: number;
  fileName?: string;
  file!: File;
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;
  userId!: string;
  companyId!: string;
  storedUserType!: string;
  companies?: Company[];
  userTypes?: UserType[];
  busy: boolean = true;
  userType?: string;

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl([
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^251\d{9}$/),
    ]),
    city: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    avatar: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private storeService: StoreService,
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
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.validateCalls();
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getAllComapnies();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId);
    }
  }

  getAllComapnies() {
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

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  uploadAvatar(file: File) {
    return lastValueFrom(this.storeService.uploadImage(file));
  }

  create(store: StoreCreate) {
    return lastValueFrom(this.storeService.create(store));
  }

  save() {
    this.busy = true;
    const cityValue = `${this.form.get("city")?.value}`;
    const countryValue = `${this.form.get("country")?.value}`;
    const phoneNumber = `${this.form.get("phoneNumber")?.value}`;

    if (typeof phoneNumber === "string") {
      this.code = `+${phoneNumber.slice(0, 3)}`;

      this.number = Number(phoneNumber.slice(3));
    }

    this.address = new Address(cityValue, countryValue);
    this.phone = new Phone(this.code, this.number);
    this.model.address = this.address;
    this.model.phone = this.phone;
    this.model.avatar = this.fileName ?? "";
    this.model.userId = this.userId;
    this.model.status = this.form.get("status")!.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.companyId = this.form.get("companyId")?.value!;

    this.create(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== "") {
            this.uploadAvatar(this.file)
              .then(
                (res) => {},
                (reject) => {}
              )
              .catch((error) => {})
              .finally(() => {
                this.busy = false;
              });
          }
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
