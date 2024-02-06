import { Component, OnInit } from "@angular/core";

import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { firstValueFrom } from "rxjs";
import { Product } from "../../../models/product/product.model";
import { ListOfUnits } from "../../../models/units/units_list.model";
import { Category } from "../../../models/category/category.model";
import { CategoryService } from "../../category/category.service";
import { AllUnitService } from "../../unit/unit.service";
import { SearchResult } from "../../../interfaces/search-result";
import { Company } from "../../../models/company/company.model";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Location } from "@angular/common";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  product!: Product;
  productID!: string;
  [x: string]: any;

  model!: Product;
  number!: number;
  fileName?: string;
  file!: File;
  userId!: string;
  companyId!: string;
  imgUrl!: string;
  busy: boolean = true;
  unitsData!: ListOfUnits[];
  categoriesData!: Category[];
  page = 1;
  pageSize = 10;
  pages: number[] = [];
  companies?: Company[];
  storedUserType!: string;
  numberInStock!: number;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [
      Validators.required,
      Validators.maxLength(255),
    ]),
    avatar: new FormControl("", [Validators.required]),
    amountInStock: new FormControl("", [Validators.required]),
    unitId: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    categoryId: new FormControl("", [Validators.required]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private productService: ProductService,
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
    this.productID = this.storageService.getData(this.keyService.PRODUCT_KEY);
    this.numberInStock = this.storageService.getData(this.keyService.STOCK_KEY);
    this.getProductsById(this.productID);
    this.storageService.deleteData(this.keyService.PRODUCT_KEY);
    this.imgUrl = this.productService.getProductImage();
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

  getProductsById(productID: string) {
    return lastValueFrom(this.productService.getProductsById(productID))
      .then(
        (result) => {
          this.product = result;

          if (this.product) {
            this.form.get("id")!.setValue(this.product.id);
            this.form.get("name")?.setValue(this.product.name);
            this.form.get("description")?.setValue(this.product.description);
            this.form.get("unitId")?.setValue(this.product.unit?.id ?? null);
            this.form
              .get("categoryId")
              ?.setValue(this.product.category?.id ?? null);

            this.fileName = this.product.avatar;
            this.form.get("amountInStock")?.setValue(`${this.numberInStock}`);
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

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  uploadAvatar(file: File) {
    return lastValueFrom(this.productService.uploadImage(file));
  }

  edit(product: Product) {
    return lastValueFrom(this.productService.edit(product));
  }

  save() {
    this.busy = true;
    this.model = this.model || {};

    this.model.unitId = this.form.get("unitId")?.value!;
    this.model.categoryId = this.form.get("categoryId")?.value!;
    this.model.avatar = this.fileName ?? "";
    this.model.userId = this.userId;
    this.model.description = this.form.get("description")!.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.id = this.form.get("id")?.value!;
    this.model.companyId = this.product.company.id!;
    this.model.amountInStock = parseFloat(
      this.form.get("amountInStock")!.value!
    );
    console.log(this.model);

    this.edit(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== this.product.avatar) {
            console.log("called");
            this.uploadAvatar(this.file).then((res) => {});
          }
          this.toastService.success("Success");
          this.location.back();
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

  public getUnits(): Promise<any> {
    return firstValueFrom(this.unitService.getUnits(this.page, this.pageSize));
  }

  getUnitesList(): void {
    this.busy = true;
    this.getUnits()
      .then(
        (result: SearchResult) => {
          this.unitsData = result.data;
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

  populateData(arg: Product) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
    this.form.get("description")?.setValue(arg.description);
    this.form.get("unitId")?.setValue(arg.unitId);
    this.form.get("categoryId")?.setValue(arg.categoryId);
    this.fileName = arg.avatar;
  }

  goBack() {
    this.location.back();
  }
}
