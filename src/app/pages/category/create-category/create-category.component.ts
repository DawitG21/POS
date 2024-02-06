import { Component, OnInit } from "@angular/core";

import { CategoryCreate } from "../../../models/category/category-create.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { CategoryService } from "../category.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { Location } from "@angular/common";
import { Company } from "../../../models/company/company.model";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.css"],
})
export class CreateCategoryComponent implements OnInit {
  [x: string]: any;

  model: CategoryCreate = new CategoryCreate();
  description!: string;
  code!: string;
  number!: number;
  fileName?: string;
  file!: File;
  userId!: string;
  companyId!: string;
  storedUserType!: string;
  companies?: Company[];
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;
  busy: boolean = true;

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    avatar: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private categoryService: CategoryService,
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

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  create(category: CategoryCreate) {
    return lastValueFrom(this.categoryService.create(category));
  }

  save() {
    this.busy = true;
    this.model.description = this.form.get("description")!.value!;
    this.model.avatar = this.fileName ?? "";
    this.model.userId = this.userId;
    this.model.companyId = this.form.get("companyId")?.value!;
    this.model.status = this.form.get("status")!.value!;
    this.model.name = this.form.get("name")?.value!;

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

  uploadAvatar(file: File) {
    return lastValueFrom(this.categoryService.uploadImage(file));
  }

  goBack() {
    this.location.back();
  }
}
