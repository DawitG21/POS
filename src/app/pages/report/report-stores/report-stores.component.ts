import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XSLX from 'xlsx';
import { Company } from '../../../models/company/company.model';
import { UserType } from '../../../models/usertypes/usertype.model';
import { StorageService } from '../../../service/storage.service';
import { KeyService } from '../../../service/key.service';
import { AuthService } from '../../../service/auth.service';
import { lastValueFrom } from 'rxjs';
import { ViewCompanyService } from '../../company/view-company/view_company.service';
import { ReportService } from './../report.service';
import { Store } from '../../../models/store/store.model';

@Component({
  selector: 'app-report-stores',
  templateUrl: './report-stores.component.html',
  styleUrls: ['./report-stores.component.css']
})
export class ReportStoresComponent implements OnInit {
  busy: boolean = true;
  companies?: Company[];
  userTypes?: UserType[];
  storedUserType?: string;
  companyId?: string;
  pages: number[] = [];
  stores: Store[] = [];
  page: number = 1;
  pageSize: number = 10;
  startPage = 1;
  endPage = 10;
  form = new FormGroup({
    companyId: new FormControl("", [Validators.required]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService,
    private viewCompanyService: ViewCompanyService,
    private reportService: ReportService
  ) {

  }

  ngOnInit(): void {
    this.busy = true;
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.validateCalls();
    //this.getStoresReport(this.companyId);
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getAllComapnies();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId!);
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
        (reject) => { }
      )
      .catch((error) => { })
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
        (reject) => { }
      )
      .catch((error) => { })
      .finally(() => {
        this.busy = false;
      });
  }

  getStoresReport(companyId: string) {
    return lastValueFrom(this.reportService.getStoresByCompanyIdReport(companyId, this.page, this.pageSize))
      .then(
        (result) => {
          this.stores = result.data;
          console.log(this.stores);
        },
        (reject) => { }
      )
      .catch((error) => { })
      .finally(() => {
        this.busy = false;
      });
  }

  generateReport() {
    let companyId;
    this.busy = true;
    this.stores = [];
    if (this.storedUserType == "POS Owner") {
      companyId = this.form.get('companyId')?.value!;
    } else {
      companyId = this.companyId;
    }
    this.getStoresReport(companyId!);
  }

  exportExcel() {
    let filename = "pos.xlsx";
    let data = document.getElementById("table-data");
    const ws: XSLX.WorkSheet = XSLX.utils.table_to_sheet(data);
    const wb: XSLX.WorkBook = XSLX.utils.book_new();
    XSLX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XSLX.writeFile(wb, filename);
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

    this.validateCalls();
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
      this.validateCalls();
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
      this.validateCalls();
    }
  }

  setCurrentPage(page: number) {
    // Ensure the clicked page is within the valid range
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      this.validateCalls();
    }
  }

}
