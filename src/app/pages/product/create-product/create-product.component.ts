import { Component, OnInit } from "@angular/core";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { ProductService } from "../product.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { ProductCreate } from "../../../models/product/product-create.model";
import { AllUnitService } from "../../unit/unit.service";
import { ListOfUnits } from "../../../models/units/units_list.model";
import { SearchResult } from "../../../interfaces/search-result";
import { firstValueFrom } from "rxjs";
import { CategoryService } from "../../category/category.service";
import { Category } from "../../../models/category/category.model";
import { Location } from "@angular/common";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
})
export class CreateProductComponent implements OnInit {
  [x: string]: any;

  model!: ProductCreate;
  fileName?: string;
  file!: File;
  userId!: string;
  companyId!: string;
  storedUserType!: string;
  busy: boolean = true;
  unitsData!: ListOfUnits[];
  categoriesData!: Category[];
  companies?: Company[];
  page = 1;
  pageSize = 10;
  pages: number[] = [];

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [
      Validators.required,
      Validators.maxLength(255),
    ]),
    avatar: new FormControl("", [Validators.required]),
    unitId: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    categoryId: new FormControl("", [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private unitService: AllUnitService,
    private categoryService: CategoryService,
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
    this.busy = false;
    this.validateCalls();
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getAllComapnies();
      this.getUnitesList();
      this.getCategoriesList();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId);
      this.getUnitsByCompanyId(this.companyId);
      this.getCategoriesByCompanyId(this.companyId);
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

  getUnitsByCompanyId(companyId: string) {
    return lastValueFrom(
      this.unitService.getUnitsbyCompany(this.page, this.pageSize, companyId)
    )
      .then(
        (result) => {
          this.unitsData = result.data;
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  getCategoriesByCompanyId(companyId: string) {
    return lastValueFrom(
      this.categoryService.getCategoriesbyCompany(
        this.page,
        this.pageSize,
        companyId
      )
    )
      .then(
        (result) => {
          this.categoriesData = result.data;
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  public getUnits(): Promise<any> {
    return firstValueFrom(this.unitService.getUnits(this.page, this.pageSize));
  }

  getUnitesList(): void {
    this.busy = true;
    this.getUnits()
      .then(
        (result: SearchResult) => {
          this.unitsData = result.data;
          //this.rePaginate(result.rows, result.page - 1);
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

  public getCategories(): Promise<any> {
    return firstValueFrom(
      this.categoryService.getCategories(this.page, this.pageSize)
    );
  }

  getCategoriesList(): void {
    this.busy = true;
    this.getCategories()
      .then(
        (result: SearchResult) => {
          this.categoriesData = result.data;
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

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  create(product: ProductCreate) {
    return lastValueFrom(this.productService.create(product));
  }

  save() {
    this.busy = true;
    const unitValue = `${this.form.get("unitId")?.value}`;
    const categoryValue = `${this.form.get("categoryId")?.value}`;

    this.model = new ProductCreate();
    this.model.unitId = unitValue;
    this.model.categoryId = categoryValue;
    this.model.avatar = this.fileName ?? "";
    this.model.userId = this.userId;
    this.model.companyId = this.form.get("companyId")?.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.description = `${this.form.get("description")?.value}`;

    this.create(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== "") {
            this.uploadAvatar(this.file)
              .then(
                (res) => {
                  console.log(res);
                },
                (reject) => {
                  console.error(reject);
                }
              )
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                this.busy = false;
              });
          }
          this.form.reset();
          this.location.back();
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

  uploadAvatar(file: File) {
    return lastValueFrom(this.productService.uploadImage(file));
  }

  goBack() {
    this.location.back();
  }
}
