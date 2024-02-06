import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Transfer } from '../../../models/transfer/transfer.model';
import { Product } from '../../../models/product/product.model';
import { Store } from '../../../models/store/store.model';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
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
import { AuthService } from '../../../service/auth.service';
import { TransferProduct } from '../../../models/transfer/product-transfer.model';

@Component({
  selector: 'app-edit-transfers',
  templateUrl: './edit-transfers.component.html',
  styleUrls: ['./edit-transfers.component.css']
})
export class EditTransfersComponent implements OnInit {
  transfer!: Transfer;
  [x: string]: any;

  model!: Transfer;
  productsData!: Product[];
  stores?: Store[];
  selectedFromStore:string = "";
  selectedToStore:string = "";
  quantity!: number;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  storedUserType!: string;

  form = new FormGroup({
    'id': new FormControl('', [Validators.required]),
    products: this.fb.array([]),
    'fromstore': new FormControl('', [Validators.required]),
    'tostore': new FormControl('', [Validators.required]),
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
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.transfer = this.storageService.getData(this.keyService.TRANSFER_KEY);
    this.storageService.deleteData(this.keyService.TRANSFER_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.storedUserType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.companyId = this.authService.getCompanyId;
    this.populateData(this.transfer);
    if (this.storedUserType == "Company User" || this.storedUserType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
      this.getProductsByCompanyId(this.companyId);
    }
    else if (this.storedUserType == "POS Owner") {
      this.getAllStoreList();
      this.getAllProductList();
    }
    this.busy = false;
  }

  edit(transfer: Transfer) {
    return lastValueFrom(this.transferService.edit(transfer));
  }

//Get stores
  public getStores(): Promise<any> {
    return firstValueFrom(this.storeService.getStores(this.page, this.pageSize));
  }
  getAllStoreList(): void {
    this.busy = true;
    this.getStores().then((result: SearchResult) => {
      this.stores = result.data;
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
          this.productsData = result.data!;
          this.pages = Array.from(
            { length: result.pages },
            (_, index) => index + 1
          );
        } else {
          this.productsData = [];
          this.productsData = result.data!;
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

  onToStoreChange(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedToStore = selectElement.value;
  }


  save() {
    this.busy = true;
    this.model = this.model || {};

    this.model.userId = this.userId;
    // this.model.quantity = Number(`${this.form.get('quantity')?.value}`);

    this.model.id = this.form.get('id')?.value!;
    // this.model.productId = `${this.form.get('product')?.value}`;
    this.model.fromstoreId = `${this.form.get('fromstore')?.value}`;
    this.model.tostoreId = `${this.form.get('tostore')?.value}`;
    this.model.companyId = this.transfer.company.id!;

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
        salesPrice: +productControl.get("salesPrice")?.value,
      };
  
      // Push the product object to the productsArray
      productsArray.push(product);
    });
  
    // Assign the productsArray to the model
    this.model.products = productsArray;
    console.log(this.model);

    this.edit(this.model).then((result) => {
      this.toastService.success("Success");
      this.location.back();
    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    }).catch((error) => {
      this.toastService.error(this.messageService.serverError);
    }).finally(() => {
      this.busy = false;
    });
  }

  populateData(arg: Transfer) {
    this.form.get('id')!.setValue(arg.id);
    // this.form.get('product')?.setValue(arg.products.productId);
    // this.form.get('quantity')?.setValue(arg.products.quantity);
    this.form.get('fromstore')?.setValue(arg.storeFrom.id);
    this.form.get('tostore')?.setValue(arg.storeTo.id);
    const productsFormArray = this.form.get("products") as FormArray;
    productsFormArray.clear();

    // Iterate through the products array in arg and add form groups to the products form array
    arg.products.forEach((product) => {
      productsFormArray.push(
        this.fb.group({
          productname: product.name,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
          salesPrice: product.salesPrice,
        })
      );
    });
  }

  goBack() {
    this.location.back();
  }

}
