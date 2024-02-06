import { Component, ViewChild, OnInit } from "@angular/core";
import { CategoryService } from "./category.service";
import { firstValueFrom } from "rxjs";

import { SearchResult } from "../../interfaces/search-result";
import { Category } from "../../models/category/category.model";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../service/storage.service";
import { KeyService } from "../../service/key.service";
import Swal from "sweetalert2";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  categories!: Category[];
  busy: boolean = true;
  imgUrl!: string;
  category!: Category;
  searchCategoryTerm: string = "";
  claims: any;
  usertype!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private categoryService: CategoryService,
    public route: Router,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService,
    private messageService: MessageService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.imgUrl = this.categoryService.getCategoryImage();
    this.usertype = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.companyId = this.authService.getCompanyId;
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getCategoriesbyCompany(this.companyId);
    } else if (this.usertype == "POS Owner") {
      this.getAllCategories();
    }
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;

    if (this.pageSize == 20) {
      this.page = Math.round(this.page / 2);

      if (this.page % 10 == 0) {
        this.startPage = this.page - 9;
        this.endPage = this.page;
      } else {
        this.startPage = this.page - (this.page % 10) + 1;
        this.endPage = this.startPage + 9;
      }

      if (this.endPage > this.pages.length / 2) {
        this.endPage = Math.round(this.pages.length / 2);
      } else {
        this.endPage = this.startPage + 9;
      }
    } else if (this.pageSize == 10) {
      this.page = this.page * 2 - 1;
      this.startPage = this.page - (this.page % 10) + 1;
      this.endPage = this.startPage + 9;

      if (this.endPage > this.pages.length * 2) {
        this.endPage = this.pages.length * 2;
      } else {
        this.endPage = this.startPage + 9;
      }
    }
    if (this.usertype == "Company User" || this.usertype == "Company Admin") {
      this.getCategoriesbyCompany(this.companyId);
    } else if (this.usertype == "POS Owner") {
      this.getAllCategories();
    }
  }

  setPageRangeSubtract(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (page === 1) {
        this.startPage = this.page;
        this.endPage = this.startPage + 9;
      } else {
        if (this.endPage === this.pages.length) {
          this.endPage = this.endPage - (this.endPage % 10);
          this.startPage = this.endPage - 9;
        } else {
          this.startPage -= 10;
          this.endPage -= 10;
        }
      }
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getCategoriesbyCompany(this.companyId);
      } else if (this.usertype == "POS Owner") {
        this.getAllCategories();
      }
    }
  }

  setPageRangeAdd(page: number) {
    if (page >= 1 && page < this.pages.length) {
      this.page = page + 10;
      if (this.page >= this.pages.length) {
        page = this.pages.length;
        this.page = this.pages.length;
        this.endPage = this.pages.length;
        if (this.endPage % 10 === 0) this.startPage = this.endPage - 9;
        else this.startPage = this.pages.length - (this.pages.length % 10) + 1;
      } else {
        this.startPage += 10;
        this.endPage += 10;
        if (this.endPage > this.pages.length) this.endPage = this.pages.length;
      }
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getCategoriesbyCompany(this.companyId);
      } else if (this.usertype == "POS Owner") {
        this.getAllCategories();
      }
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.usertype == "Company User" || this.usertype == "Company Admin") {
        this.getCategoriesbyCompany(this.companyId);
      } else if (this.usertype == "POS Owner") {
        this.getAllCategories();
      }
    }
  }

  public getCategories(): Promise<any> {
    return firstValueFrom(
      this.categoryService.getCategories(this.page, this.pageSize)
    );
  }

  getAllCategories(): void {
    this.busy = true;
    this.getCategories()
      .then(
        (result: SearchResult) => {
          if (this.categories?.length === 0) {
            this.categories = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.categories = [];
            this.categories = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
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

  getCategoriesbyCompany(companyId: string) {
    this.busy = true;
    return firstValueFrom(
      this.categoryService.getCategoriesbyCompany(
        this.page,
        this.pageSize,
        companyId
      )
    )
      .then(
        (result) => {
          if (this.categories?.length === 0) {
            this.categories = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.categories = [];
            this.categories = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
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

  goCreateCategory() {
    this.route.navigate(["categories/create"]);
  }

  goEditCategory(category: Category) {
    this.route.navigate(["categories/edit"]);
    this.storageService.setData(this.keyService.CATEGORY_KEY, category);
  }

  view(category: Category) {
    this.category = category;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  formatDateToCustomFormat(dateString: string): string {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  public deleteCategory(id: string): Promise<any> {
    return firstValueFrom(this.categoryService.delete(id));
  }

  delete(category: Category) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.busy = true;
        this.deleteCategory(category.id)
          .then(
            (result) => {
              this.categories = this.categories.filter(
                (categ) => categ !== category
              );
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
    });
  }
}
