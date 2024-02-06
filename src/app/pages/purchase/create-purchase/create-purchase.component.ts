import { Component, ViewChild } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { SearchResult } from "../../../interfaces/search-result";
import { PurchaseCreate } from "../../../models/purchase/purchase-create.model";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { PurchaseService } from "../purchase.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { StoreService } from "../../store/store.service";
import { SupplierService } from "../../supplier/supplier.service";
import { Store } from "../../../models/store/store.model";
import { Supplier } from "../../../models/supplier/supllier.model";
import { Product } from "../../../models/product/product.model";
import { ProductService } from "../../product/product.service";
import { PurchaseProduct } from "../../../models/purchase/purchase-product.model";
import { Location } from "@angular/common";
import { AuthService } from "../../../service/auth.service";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";

@Component({
  selector: "app-create-purchase",
  templateUrl: "./create-purchase.component.html",
  styleUrls: ["./create-purchase.component.css"],
})
export class CreatePurchaseComponent {
  [x: string]: any;

  model!: PurchaseCreate;
  fileName?: string;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  stores?: Store[];
  supplierData!: Supplier[];
  productData!: Product[];
  companies?: Company[];
  storedUserType!: string;

  form = new FormGroup({
    reference: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    purchaseDate: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    discount: new FormControl("", [Validators.required]),
    storeId: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    actionType: new FormControl("", [Validators.required]),
    supplierId: new FormControl("", [Validators.required]),
    products: this.fb.array([]), // Using FormArray for products
  });

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private purchaseService: PurchaseService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private storeService: StoreService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private viewCompanyService: ViewCompanyService
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
      this.getStoresList();
      this.getSupplierList();
      this.getProductList();
      this.getAllComapnies();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId);
      this.getStoresByCompanyId(this.companyId);
      this.getSupplierByCompanyId(this.companyId);
      this.getProductByCompanyId(this.companyId);
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

  getStoresByCompanyId(companyId: string) {
    return lastValueFrom(
      this.storeService.getStoresByCompanyId(
        companyId,
        this.page,
        this.pageSize
      )
    )
      .then(
        (result) => {
          this.stores = result.data;
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  getProductByCompanyId(companyId: string) {
    return lastValueFrom(
      this.productService.getProductsByCompany(
        this.page,
        this.pageSize,
        companyId
      )
    )
      .then(
        (result) => {
          if (result.data) {
            this.productData = result.data;
          } else {
            console.error("Data is undefined");
          }
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  getSupplierByCompanyId(companyId: string) {
    return lastValueFrom(
      this.supplierService.getSuppliersbyCompany(
        this.page,
        this.pageSize,
        companyId
      )
    )
      .then(
        (result) => {
          if (result.data) {
            this.supplierData = result.data;
          } else {
            console.error("Data is undefined");
          }
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  get products() {
    return this.form.get("products") as FormArray;
  }

  setProducts(products: PurchaseProduct[]) {
    const productsFormArray = this.fb.array(
      products.map((product) =>
        this.fb.group({
          productId: [product.productId, Validators.required],
          quantity: [product.quantity, Validators.required],
          rate: [product.rate, Validators.required],
          salesPrice: [product.salesPrice, Validators.required],
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
        salesPrice: ["", Validators.required],
      })
    );
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  public getStores(): Promise<any> {
    return firstValueFrom(
      this.storeService.getStores(this.page, this.pageSize)
    );
  }

  getStoresList(): void {
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

  getSupplierList(): void {
    this.busy = true;
    this.getSupplier()
      .then(
        (result: SearchResult) => {
          if (this.supplierData?.length === 0) {
            this.supplierData = result.data;
          } else {
            this.supplierData = [];
            this.supplierData = result.data;
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

  public getSupplier(): Promise<any> {
    return firstValueFrom(
      this.supplierService.getSuppliers(this.page, this.pageSize)
    );
  }

  public getProduct(): Promise<any> {
    return firstValueFrom(
      this.productService.getProducts(this.page, this.pageSize)
    );
  }

  getProductList(): void {
    this.busy = true;
    this.getProduct()
      .then(
        (result: SearchResult) => {
          this.productData = result.data;
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

  create(purchase: PurchaseCreate) {
    return lastValueFrom(this.purchaseService.create(purchase));
  }

  save() {
    const formData = this.form.value;
    console.log(formData);
    this.busy = true;
    const storeValue = `${this.form.get("storeId")?.value}`;
    const SupplierValue = `${this.form.get("supplierId")?.value}`;

    this.model = new PurchaseCreate();
    this.model.storeId = storeValue;
    this.model.supplierId = SupplierValue;
    this.model.userId = this.userId;
    this.model.companyId = this.form.get("companyId")?.value!;
    this.model.reference = this.form.get("reference")?.value!;
    this.model.purchaseDate = this.form.get("purchaseDate")?.value!;
    this.model.description = this.form.get("description")?.value!;
    this.model.discount = +this.form.get("discount")?.value!;
    //this.model.transType = this.form.get("transType")?.value!;
    this.model.actionType = this.form.get("actionType")?.value!;

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
        salesPrice: +productControl.get("salesPrice")?.value,
      };

      // Push the product object to the productsArray
      productsArray.push(product);
    });

    // Assign the productsArray to the model
    this.model.products = productsArray;
    console.log(this.model);

    // this.create(this.model)
    //   .then(
    //     (result) => {
    //       this.toastService.success("Success");
    //       this.form.reset();
    //     },
    //     (reject) => {
    //       this.toastService.error(this.messageService.serverError);
    //     }
    //   )
    //   .catch((error) => {
    //     this.toastService.error(this.messageService.serverError);
    //   })
    //   .finally(() => {
    //     this.busy = false;
    //   });
  }

  goBack(): void {
    this.location.back();
  }
}
