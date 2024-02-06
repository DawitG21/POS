import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../../../service/app-settings.service";
import { ProductService } from "../product.service";
import { firstValueFrom, lastValueFrom } from "rxjs";

import { SearchResult } from "../../../interfaces/search-result";
import { Product } from "../../../models/product/product.model";
import { Router } from "@angular/router";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { Store } from "../../../models/store/store.model";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { StoreService } from "../../store/store.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StockService } from "../../stock.service";
import { Stock } from "../../../models/stock/stock.model";
import { StockProduct } from "../../../models/stock/stock.product";
import { AuthService } from "../../../service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.css"],
})
export class ViewProductComponent {
  menu: any;
  page = 1;
  pageSize = 10;
  productData!: Product[];
  stores?: Store[];
  companies?: Company[];
  pages: number[] = [];
  busy: boolean = true;
  imgUrl!: string;
  product!: Product;
  claims: any;
  storedUserType!: string;
  companyId!: string;
  filteredStores: any[] = [];
  stocks?: Stock[];
  productStock?: StockProduct[] = [];

  form = new FormGroup({
    companyId: new FormControl("", [Validators.required]),
    storeId: new FormControl("", [Validators.required]),
  });

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private appSettings: AppSettings,
    private productService: ProductService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private storageService: StorageService,
    private keyService: KeyService,
    private viewCompanyService: ViewCompanyService,
    private storeService: StoreService,
    private stockService: StockService,
    private authService: AuthService
  ) {}

  checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var a;
    m = this.checkTime(m);
    s = this.checkTime(s);
    a = h > 11 ? "pm" : "am";
    h = h > 12 ? h - 12 : h;

    setTimeout(() => this.getTime(), 500);

    return h + ":" + m + a;
  }

  ngOnInit() {
    this.busy = true;
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.companyId = this.authService.getCompanyId;
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.appSettings.appContentClass = "p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3";
    this.appSettings.appContentFullHeight = true;
    this.imgUrl = this.productService.getProductImage();
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.validateCalls();
    this.getInitialProductLists();
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;

    if (this.storedUserType == "POS Owner") {
      // Use Promise.all to wait for both promises to resolve
      Promise.all([this.getAllCompanies()]).finally(() => {
        this.busy = false;
      });
    }

    if (
      this.storedUserType == "Company Admin" ||
      this.storedUserType == "Company User"
    ) {
      // Use Promise.all to wait for both promises to resolve
      Promise.all([this.getCompaniesByCompanyId(this.companyId)]).finally(
        () => {
          this.busy = false;
        }
      );
    }
  }

  onCompanyChange(event: any) {
    const companyId = event.target.value;
    if (companyId) {
      this.stocks = [];
      this.getStoresByCompanyId(companyId);
    }
  }

  onStoreChange(event: any) {
    const storeId = event.target.value;
    if (storeId) {
      this.getStockByStoreId(storeId);
    }
  }

  async getInitialProductLists() {
    try {
      if (this.storedUserType == "POS Owner") {
        // Get all companies
        await this.getAllCompanies();
      }

      if (
        this.storedUserType == "Company Admin" ||
        this.storedUserType == "Company User"
      ) {
        // Get companies by company ID
        await this.getCompaniesByCompanyId(this.companyId);
      }

      // Check if there are any companies
      if (this.companies && this.companies.length > 0) {
        // Select the first company's ID
        const firstCompanyId = this.companies[4]?.id;

        if (firstCompanyId) {
          // Get stores by company ID
          await this.getStoresByCompanyId(firstCompanyId);

          // Check if there are any stores
          if (this.filteredStores && this.filteredStores.length > 0) {
            // Select the first store's ID
            const firstStoreId = this.filteredStores[1]?.id;

            if (firstStoreId) {
              // Get stocks by store ID
              await this.getStockByStoreId(firstStoreId);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  getStoresByCompanyId(companyId: string) {
    this.busy = true;
    return lastValueFrom(
      this.storeService.getStoresByCompanyId(
        companyId,
        this.page,
        this.pageSize
      )
    )
      .then(
        (result) => {
          this.filteredStores = result.data;
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      })
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

  getStockByStoreId(stockId: string) {
    this.busy = true;
    return lastValueFrom(this.stockService.getStockByStockId(stockId, 1, 100))
      .then(
        (result) => {
          this.stocks = result.data;
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

  public getProduct(): Promise<any> {
    return firstValueFrom(
      this.productService.getProducts(this.page, this.pageSize)
    );
  }

  editProduct(productID: string, stockValue: number) {
    this.route.navigate(["/product/edit"]);
    console.log("Edit" + stockValue);
    this.storageService.setData(this.keyService.PRODUCT_KEY, productID);
    this.storageService.setData(this.keyService.STOCK_KEY, stockValue);
  }

  get(): void {
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

  public deleteProduct(id: string): Promise<any> {
    return firstValueFrom(this.productService.delete(id));
  }

  delete(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(id)
          .then(
            (result) => {
              this.toastService.success("Success");
              this.getCompaniesByCompanyId(this.companyId);
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
    });
  }

  ngOnDestroy() {
    this.appSettings.appHeaderNone = false;
    this.appSettings.appSidebarNone = false;
    this.appSettings.appContentClass = "";
    this.appSettings.appContentFullHeight = false;
  }
}
