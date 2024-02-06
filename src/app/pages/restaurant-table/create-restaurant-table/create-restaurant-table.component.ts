import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { RestaurantTableService } from '../restaurant-table.service';
import { StorageService } from '../../../service/storage.service';
import { KeyService } from '../../../service/key.service';
import { ToastService } from '../../../service/toast.service';
import { MessageService } from '../../../service/message.service';
import { CreateRestaurantTable } from '../../../models/restaurant-table/create-restaurant-table.model';
import { Location } from '@angular/common';
import { Company } from '../../../models/company/company.model';
import { ViewCompanyService } from '../../company/view-company/view_company.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-create-restaurant-table',
  templateUrl: './create-restaurant-table.component.html',
  styleUrls: ['./create-restaurant-table.component.css']
})
export class CreateRestaurantTableComponent implements OnInit {
  [x: string]: any;

  model!: CreateRestaurantTable;
  userId!: string;
  busy: boolean = true;
  companies?: Company[];
  storedUserType!: string;
  companyId!: string;
  page = 1;
  pageSize = 10;
  pages: number[] = [];

  form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'companyId': new FormControl('', [Validators.required]),
  });

  constructor(
    private restaurantTableService: RestaurantTableService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.validateCalls();
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

  create(restaurantTable: CreateRestaurantTable) {
    return lastValueFrom(this.restaurantTableService.create(restaurantTable));
  }

  save() {
    this.busy = true;
    this.model = new CreateRestaurantTable();
    this.model.name = this.form.get('name')?.value!;
    this.model.companyId = this.form.get('companyId')?.value!;
    this.model.createdBy = this.userId;

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
