import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { firstValueFrom, lastValueFrom } from "rxjs";
import { Location } from "@angular/common";

import { RoleService } from "../role.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { Action } from "../../../models/action.model";
import { CreateRole } from "../../../models/role/createrole.model";
import { Permission } from "../../../models/permission/permission.model";
import { PermissionService } from "../../permissions/permission.service";
import { SearchResult } from "../../../interfaces/search-result";
import { Company } from "../../../models/company/company.model";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-create-role",
  templateUrl: "./create-role.component.html",
  styleUrls: ["./create-role.component.css"],
})
export class CreateRoleComponent implements OnInit {
  [x: string]: any;

  model!: CreateRole;
  fileName?: string;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  pages: number[] = [];
  page = 1;
  pageSize = 20;
  actionData!: Action[];
  permissionData?: Permission[];
  selectedPermissions: any[] = [];
  storedUserType!: string;
  companies?: Company[];

  form = this.fb.group({
    role: ["", [Validators.required, Validators.minLength(3)]],
    description: ["", [Validators.required, Validators.minLength(3)]],
    companyId: new FormControl("", [Validators.required]),
    claims: this.fb.array([]),
  });

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private roleService: RoleService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.busy = false;
    this.validateCalls();
    this.get();
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getAllComapnies();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId);
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

  public getPermission(): Promise<any> {
    return firstValueFrom(
      this.permissionService.getPermission(this.page, this.pageSize)
    );
  }

  goBack() {
    this.location.back();
  }

  get(): void {
    this.busy = true;
    this.getPermission()
      .then(
        (result: SearchResult) => {
          if (this.permissionData?.length === 0) {
            this.permissionData = result.data;
            console.log(this.permissionData);
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.permissionData = [];
            this.permissionData = result.data;
            console.log(this.permissionData);
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

  create(role: CreateRole) {
    return lastValueFrom(this.roleService.createRole(role));
  }

  save() {
    this.busy = true;

    // Assuming you have a class definition for CreateRole
    this.model = new CreateRole();
    this.model.companyId = this.companyId;
    this.model.role = this.form.get("role")?.value!;
    this.model.description = this.form.get("description")?.value!;
    this.model.companyId = this.form.get("companyId")?.value!;
    this.model.claims = this.selectedPermissions;

    console.log(this.model);

    this.create(this.model)
      .then(
        (result) => {
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

  updateSelectedPermissions(event: Event, claim: string) {
    let claimIndex = 0;
    console.log(claim);

    console.log(this.selectedPermissions);

    if ((event.target as HTMLInputElement).checked) {
      this.selectedPermissions.push(claim);
    } else {
      for (let i = 0; i < this.selectedPermissions.length; i++) {
        if (this.selectedPermissions[i] == claim) {
          claimIndex = i;
        }
      }
      this.selectedPermissions.splice(claimIndex, 1);
      console.log(this.selectedPermissions);
    }
  }
}
