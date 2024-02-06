import { Component, ViewChild } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { SearchResult } from "../../../interfaces/search-result";
import { AdjustmentCreate } from "../../../models/adjustments/create-adjustments.model";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { AdjustmentService } from "../adjustment.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { StoreService } from "../../store/store.service";
import { SupplierService } from "../../supplier/supplier.service";
import { Store } from "../../../models/store/store.model";
import { Product } from "../../../models/product/product.model";
import { ProductService } from "../../product/product.service";
import { PurchaseProduct } from "../../../models/purchase/purchase-product.model";
import { AdjustmentProduct } from "../../../models/adjustments/adjustment-product.model";
import { Location } from "@angular/common";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-create-adjustment',
  templateUrl: './create-adjustment.component.html',
  styleUrls: ['./create-adjustment.component.css']
})
export class CreateAdjustmentComponent {
  [x: string]: any;
  model!: AdjustmentCreate;
  fileName?: string;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  stores?: Store[];
  productsData?: Product[];
  storedUserType!: string;
  companies?: Company[];

  form = new FormGroup({
    reference: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    adjustmentDate: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    storeId: new FormControl("", [Validators.required]),
    products: this.fb.array([]), 
    companyId: new FormControl("", [Validators.required]),
  });

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private adjustmentService: AdjustmentService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private storeService: StoreService,
    private productService: ProductService,
    private fb: FormBuilder, 
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.validateCalls();
    if (this.storedUserType == "Company User" || this.storedUserType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
      this.getProductsByCompanyId(this.companyId);
    }
    else if (this.storedUserType == "POS Owner") {
      this.getAllStoresList();
      this.getAllProductList();
    }
    this.busy = false;
  }

  validateCalls(): void {
    this.busy = true;
    if( this.storedUserType == "POS Owner") {
      this.getAllCompanies();
    }
    if( this.storedUserType == "Company Admin") {
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
  
  get products() {
    return this.form.get("products") as FormArray;
  }

  setProducts(products: AdjustmentProduct[]) {
    const productsFormArray = this.fb.array(
      products.map((product) =>
        this.fb.group({
          productId: [product.id, Validators.required],
          quantity: [product.quantity, Validators.required],
          rate: [product.rate, Validators.required],
        })
      )
    );

    // Use type assertion to satisfy TypeScript
    (this.form.controls["products"] as FormArray).clear();
    productsFormArray.controls.forEach((control) => {
      (this.form.controls["products"] as FormArray).push(control);
    });
}

addProduct() {
  this.products.push(
    this.fb.group({
      productId: ["", Validators.required],
      quantity: ["", Validators.required],
      rate: ["", Validators.required],
    })
  );
}

removeProduct(index: number) {
  this.products.removeAt(index);
}

public getProduct(): Promise<any> {
  return firstValueFrom(
    this.productService.getProducts(this.page, this.pageSize)
  );
}

getAllProductList(): void {
  this.busy = true;
  this.getProduct()
    .then(
      (result: SearchResult) => {
        this.productsData = result.data;
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

getProductsByCompanyId(companyId: string) {
  this.busy = true;
  return lastValueFrom(this.productService.getProductsByCompany(this.page, this.pageSize, companyId))
  .then(
    (result) => {
      if (this.productsData?.length === 0) {
        this.productsData = result.data;
        this.pages = Array.from(
          { length: result.pages },
          (_, index) => index + 1
        );
      } else {
        this.productsData = [];
        this.productsData = result.data;
        this.pages = Array.from(
          { length: result.pages },
          (_, index) => index + 1
        );
      }

    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    }
  ).catch((error) => {
    this.toastService.error(this.messageService.serverError);

  }).finally(() => {

    this.busy = false;
  }
  );
}

public getStores(): Promise<any> {
  return firstValueFrom(
    this.storeService.getStores(this.page, this.pageSize)
  );
}

getAllStoresList(): void {
  this.busy = true;
  this.getStores()
    .then(
      (result: SearchResult) => {
        if (this.stores?.length === 0) {
          this.stores = result.data;
        } else {
          this.stores = [];
          this.stores = result.data;
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

getStoresByCompanyId(companyId: string) {
  this.busy = true;
  return lastValueFrom(this.storeService.getStoresByCompanyId(companyId, this.page, this.pageSize))
  .then(
    (result) => {
      if (this.stores?.length === 0) {
        this.stores = result.data;
        this.pages = Array.from(
          { length: result.pages },
          (_, index) => index + 1
        );
      } else {
        this.stores = [];
        this.stores = result.data;
        this.pages = Array.from(
          { length: result.pages },
          (_, index) => index + 1
        );
      }

    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    }
  ).catch((error) => {
    this.toastService.error(this.messageService.serverError);

  }).finally(() => {

    this.busy = false;
  }
  );
}
create(adjustment: AdjustmentCreate) {
  return lastValueFrom(this.adjustmentService.create(adjustment));
}

save() {
  this.busy = true;
  const storeValue = `${this.form.get("storeId")?.value}`;

  this.model = new AdjustmentCreate();
  this.model.storeId = storeValue;
  this.model.userId = this.userId;
  this.model.companyId = this.companyId;
  this.model.adjustmentDate = this.form.get("adjustmentDate")?.value!;
  this.model.description = this.form.get("description")?.value!;
  this.model.companyId = this.form.get("companyId")?.value!;
  // Access the products form array
  const productsFormArray = this.form.get("products") as FormArray;

  // Create an array to store product objects
  const productsArray: any[] = [];

  // Iterate over each product in the products form array
  productsFormArray.controls.forEach((productControl) => {
    // Create a product object and populate it with form values
    const product: any = {
      productId: productControl.get("productId")?.value,
      quantity: +productControl.get("quantity")?.value,
      rate: +productControl.get("rate")?.value,
    };

    // Push the product object to the productsArray
    productsArray.push(product);
  });

  // Assign the productsArray to the model
  this.model.products = productsArray;
  console.log(this.model)

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
