import { Component, OnInit } from "@angular/core";

import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { forkJoin, lastValueFrom } from "rxjs";
import { firstValueFrom } from "rxjs";
import { SearchResult } from "../../../interfaces/search-result";
import { Store } from "../../../models/store/store.model";
import { Product } from "../../../models/product/product.model";
import { StoreService } from "../../store/store.service";
import { ProductService } from "../../product/product.service";
import { DatePipe } from "@angular/common";
import { AdjustmentProduct } from "../../../models/adjustments/adjustment-product.model";
import { Adjustments } from "../../../models/adjustments/adjustments.model";
import { AdjustmentService } from "../adjustment.service";
import { Location } from "@angular/common";
import { AuthService } from "../../../service/auth.service";
@Component({
  selector: 'app-edit-adjustment',
  templateUrl: './edit-adjustment.component.html',
  styleUrls: ['./edit-adjustment.component.css']
})
export class EditAdjustmentComponent {
  adjustment!: Adjustments;
  [x: string]: any;
  model!: Adjustments;
  number!: number;
  fileName?: string;
  file!: File;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  stores?: Store[];
  productData?: Product[];
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  storedUserType!: string;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    reference: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl("", [Validators.required]),
    products: this.fb.array([]), // Using FormArray for products
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private adjustmentService: AdjustmentService,
    private toastService: ToastService,
    private messageService: MessageService,
    private storeService: StoreService,
    private productService: ProductService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private location: Location,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.adjustment = this.storageService.getData(this.keyService.ADJUSTMENTS_KEY);
    console.log(this.adjustment);
    this.storageService.deleteData(this.keyService.ADJUSTMENTS_KEY);
    this.storedUserType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    if (this.storedUserType == "Company User" || this.storedUserType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
      this.getProductsByCompanyId(this.companyId);

    }
    else if (this.storedUserType == "POS Owner") {
      this.getAllStoresList();
      this.getAllProductList();

    }
    this.busy = false;
    this.populateData(this.adjustment);
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
          this.productData = result.data;
          console.log(this.productData)
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
        if (this.productData?.length === 0) {
          this.productData = result.data;
          console.log(this.productData);
          this.pages = Array.from(
            { length: result.pages },
            (_, index) => index + 1
          );
        } else {
          this.productData = [];
          this.productData = result.data;
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
  
  populateData(arg: Adjustments) {
    console.log(arg);
    this.form.get("id")!.setValue(arg.id);
    this.form.get("description")?.setValue(arg.description);

    // Clear existing products in the form array
    const productsFormArray = this.form.get("products") as FormArray;
    productsFormArray.clear();

    // Iterate through the products array in arg and add form groups to the products form array
    arg.products.forEach((product) => {
      productsFormArray.push(
        this.fb.group({
          productname: product.name,
          productId: product.id,
          quantity: product.quantity,
          rate: product.rate,
        })
      );
    });
  }

  edit(adjustment: Adjustments) {
    return lastValueFrom(
      this.adjustmentService.edit(adjustment)
    );
  }

  save() {
    this.busy = true;

    // Initialize this.model if it is undefined
    this.model = this.model || {};
    this.model.description = this.form.get("description")!.value!;
    this.model.id = this.form.get("id")?.value!;
    //console.log(this.model);
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

    console.log(this.model);
    this.edit(this.model)
      .then(
        (result) => {
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

  goBack() {
    this.location.back();
  }
}
