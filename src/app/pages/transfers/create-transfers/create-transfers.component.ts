import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TransferCreate } from '../../../models/transfer/transfer-create.model';
import { Product } from '../../../models/product/product.model';
import { Store } from '../../../models/store/store.model';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { StoreService } from '../../store/store.service';
import { TransferService } from '../transfer.service';
import { ProductService } from '../../product/product.service';
import { StorageService } from '../../../service/storage.service';
import { KeyService } from '../../../service/key.service';
import { ToastService } from '../../../service/toast.service';
import { MessageService } from '../../../service/message.service';
import { SearchResult } from '../../../interfaces/search-result';
import { Company } from '../../../models/company/company.model';
import { ViewCompanyService } from '../../company/view-company/view_company.service';
import { AuthService } from '../../../service/auth.service';
import { TransferProduct } from '../../../models/transfer/product-transfer.model';

@Component({
  selector: 'app-create-transfers',
  templateUrl: './create-transfers.component.html',
  styleUrls: ['./create-transfers.component.css']
})
export class CreateTransfersComponent implements OnInit {
  [x: string]: any;
  
  model!: TransferCreate;
  // product!: Product;
  productsData?: Product[];
  store!: Store;
  stores?: Store[];
  fromStores?: Store[];
  toStores: Store[] = [];
  selectedFromStore:string = '';
  selectedToStore:string = '';
  userId!: string;
  companyId!: string;
  fromStoreId!: string;
  toStoreId!: string;
  busy: boolean = true;
  page = 1;
  pageSize = 10;
  pages: number[] = [];
  companies?: Company[];
  storedUserType!: string;

  form = new FormGroup({
    'fromstore': new FormControl('', [Validators.required]),
    'tostore': new FormControl('', [Validators.required]),
    'companyId': new FormControl('', [Validators.required]),
    products: this.fb.array([]),
  });

  constructor(
    private storeService: StoreService,
    private transferService: TransferService,
    private productService: ProductService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.validateCalls();
    if (this.storedUserType == "Company User" || this.storedUserType == "Company Admin") {
      this.getProductsByCompanyId(this.companyId);
      this.getStoresByCompanyId(this.companyId);
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

  create(transfer: TransferCreate) {
    return lastValueFrom(this.transferService.create(transfer));
  }

//Get stores
  public getStores(): Promise<any> {
    return firstValueFrom(this.storeService.getStores(this.page, this.pageSize));
  }
  getAllStoresList(): void {
    this.busy = true;
    this.getStores().then((result: SearchResult) => {
      this.stores = result.data;
      this.fromStores = result.data;
      this.toStores = result.data;
      
    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    })
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

  get products() {
    return this.form.get("products") as FormArray;
  }

  setProducts(products: TransferProduct[]) {
    const productsFormArray = this.fb.array(
      products.map((product) =>
        this.fb.group({
          productId: [product.productId, Validators.required],
          quantity: [product.quantity, Validators.required],
          price: [product.price, Validators.required],
          salesPrice: [product.salesPrice, Validators.required]
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
      price: ["", Validators.required],
      salesPrice: ["", Validators.required],
    })
  );
}

removeProduct(index: number) {
  this.products.removeAt(index);
}

//Get products
  public getProducts(): Promise<any> {
    return firstValueFrom(this.productService.getProducts(this.page, this.pageSize));
  }
  getAllProductList(): void {
    this.busy = true;
    this.getProducts().then((result: SearchResult) => {
      this.productsData = result.data;
    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    })
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

  onFromStoreChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFromStore = selectElement.value;
  }

  onToStoreChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedToStore = selectElement.value;
  }

  save() {
    this.busy = true;
    const fromstoreValue = `${this.form.get('fromstore')?.value}`;
    const tostoreValue = `${this.form.get('tostore')?.value}`;

    this.model = new TransferCreate();
    this.model.userId = this.userId;
    this.model.companyId = `${this.form.get('companyId')?.value}`;
    this.model.fromstoreId = fromstoreValue;
    this.model.tostoreId = tostoreValue;

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
      price: +productControl.get("price")?.value,
      salesPrice: +productControl.get("salesPrice")?.value
    };

    // Push the product object to the productsArray
    productsArray.push(product);
  });

  // Assign the productsArray to the model
    this.model.products = productsArray;
    console.log(this.model);
    this.create(this.model).then((result) => {
      this.toastService.success("Success");
    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    }).catch((error) => {
      this.toastService.error(this.messageService.serverError);
    }).finally(() => {
      this.busy = false;
    });
  }

  goBack() {
    this.location.back();
  }

}
