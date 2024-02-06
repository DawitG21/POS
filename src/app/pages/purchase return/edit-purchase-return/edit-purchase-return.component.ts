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
import { PurchaseReturnService } from "../purchase-return.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { firstValueFrom } from "rxjs";
import { SearchResult } from "../../../interfaces/search-result";
import { PurchaseReturn } from "../../../models/purchase-return/purchase-return.model";
import { Store } from "../../../models/store/store.model";
import { Supplier } from "../../../models/supplier/supllier.model";
import { Product } from "../../../models/product/product.model";
import { StoreService } from "../../store/store.service";
import { SupplierService } from "../../supplier/supplier.service";
import { ProductService } from "../../product/product.service";
import { PurchaseProduct } from "../../../models/purchase/purchase-product.model";
import { DatePipe } from "@angular/common";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-purchase-return",
  templateUrl: "./edit-purchase-return.component.html",
  styleUrls: ["./edit-purchase-return.component.css"],
})
export class EditPurchaseReturnComponent implements OnInit {
  purchaseReturn!: PurchaseReturn;
  [x: string]: any;

  model!: PurchaseReturn;
  number!: number;
  fileName?: string;
  file!: File;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  stores?: Store[];
  supplierData!: Supplier[];
  productData!: Product[];
  page = 1;
  pageSize = 10;
  storedUserType!: string;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    reference: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    puchaseReturnDate: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    discount: new FormControl("", [Validators.required]),
    storeId: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    actionType: new FormControl("", [Validators.required]),
    supplierId: new FormControl("", [Validators.required]),
    products: this.fb.array([]), // Using FormArray for products
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private purchaseReturnService: PurchaseReturnService,
    private toastService: ToastService,
    private messageService: MessageService,
    private storeService: StoreService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.purchaseReturn = this.storageService.getData(
      this.keyService.PURCHASE_RETURN_KEY
    );
    this.storageService.deleteData(this.keyService.PURCHASE_RETURN_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.storageService.getData(this.keyService.COMPANYID_KEY);
    this.validateCalls();
    this.populateData(this.purchaseReturn);
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getStoresList();
      this.getSupplierList();
      this.getProductList();
    }
    if (this.storedUserType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
      this.getSupplierByCompanyId(this.companyId);
      this.getProductByCompanyId(this.companyId);
    }
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

  populateData(arg: PurchaseReturn) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("reference")?.setValue(arg.reference);
    this.form.get("description")?.setValue(arg.description);
    this.form.get("discount")?.setValue(`${arg.discount}`);
    // Format the date using DatePipe
    const formattedDate = this.datePipe.transform(
      arg.puchaseReturnDate,
      "yyyy-MM-dd"
    );

    this.form.get("puchaseReturnDate")?.setValue(formattedDate);
    this.form.get("storeId")?.setValue(arg.storeId);
    this.form.get("actionType")?.setValue(arg.actionType);
    this.form.get("supplierId")?.setValue(arg.supplierId);

    // Clear existing products in the form array
    const productsFormArray = this.form.get("products") as FormArray;
    productsFormArray.clear();

    // Iterate through the products array in arg and add form groups to the products form array
    arg.products.forEach((product) => {
      productsFormArray.push(
        this.fb.group({
          productId: product.productId,
          quantity: product.quantity,
          rate: product.rate,
        })
      );
    });
  }

  edit(purchaseReturn: PurchaseReturn) {
    return lastValueFrom(
      this.purchaseReturnService.edit(
        purchaseReturn,
        purchaseReturn.transactionId
      )
    );
  }

  save() {
    this.busy = true;

    // Initialize this.model if it is undefined
    this.model = this.model || {};
    const transactionId = this.purchaseReturn.transactionId;
    this.model.supplierId = this.form.get("supplierId")?.value!;
    this.model.storeId = this.form.get("storeId")?.value!;
    //.model.userId = this.userId;
    this.model.reference = this.form.get("reference")?.value!;
    this.model.description = this.form.get("description")!.value!;
    this.model.puchaseReturnDate = this.form.get("puchaseReturnDate")?.value!;
    this.model.discount = +this.form.get("discount")?.value!;
    this.model.actionType = this.form.get("actionType")?.value!;
    this.model.transactionId = transactionId;
    this.model.companyId = this.purchaseReturn.company.id!;
    this.model.id = this.form.get("id")?.value!;

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
