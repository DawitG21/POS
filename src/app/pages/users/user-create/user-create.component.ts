import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";

import { CreateUser } from "../../../models/user/usercreate.model";
import { SearchRole } from "../../../models/role/searchrole.model";
import { UserService } from "../user/user.service";
import { RoleService } from "../../role/role.service";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { Location } from "@angular/common";
import { UserType } from "../../../models/usertypes/usertype.model";
import { StoreService } from "../../store/store.service";
import { UserTypeService } from "../../usertypes/usertypes.service";
import { Store } from "../../../models/store/store.model";
import { ViewCompanyService } from "../../company/view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  model: CreateUser = new CreateUser();
  roles?: SearchRole[];
  stores?: Store[];
  userTypes?: UserType[];
  file!: File;
  fileName?: string;
  busy: boolean = false;
  pages: number[] = [];
  page: number = 1;
  pageSize: number = 10;
  companies?: Company[];
  userType?: string;
  companyId!: string;
  storedUserType!: string;

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    username: new FormControl("", [Validators.required, Validators.email]),
    avatar: new FormControl("", [Validators.required]),
    companyId: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
    roleId: new FormControl("", [Validators.required]),
    storeId: new FormControl("", [Validators.required]),
    userTypeId: new FormControl("", [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private storeService: StoreService,
    private userTypeService: UserTypeService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private viewCompanyService: ViewCompanyService,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.validateCalls();
    //this.getRolesByCompany(this.companyId);
    this.getUserType();
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getAllComapnies();
      this.getStore();
      this.getAllRoles();
    }
    if (this.storedUserType == "Company Admin") {
      this.getCompaniesByCompanyId(this.companyId);
      this.getStoresByCompanyId(this.companyId);
      this.getRolesByCompany(this.companyId);
    }
  }

  isAdmin(value: string) {
    for (let i = 0; i < this.userTypes!.length; i++) {
      if (value == this.userTypes![i].id) {
        this.userType = this.userTypes![i].name;
      }
    }
    if (this.userType == "Company Admin" || this.userType == "POS Owner") {
      this.form.get("roleId")?.setValue(null);
      this.form.get("roleId")?.disable();
    } else {
      this.form.get("roleId")?.enable();
    }
  }

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  uploadImage(file: File) {
    return lastValueFrom(this.userService.uploadUserImage(file));
  }

  createUser(user: CreateUser) {
    return lastValueFrom(this.userService.createUser(user));
  }

  callCreateUser() {
    this.busy = true;
    this.model.name = this.form.get("name")?.value!;
    this.model.username = this.form.get("username")?.value!;
    this.model.avatar = this.fileName ?? "";
    this.model.status = this.form.get("status")?.value!;
    this.model.companyId = this.form.get("companyId")?.value!;
    this.model.password = this.form.get("password")?.value!;
    this.model.storeId = this.form.get("storeId")?.value!;
    if (this.userType == "Company User") {
      this.model.roleId = this.form.get("roleId")?.value!;
    }
    this.model.userTypeId = this.form.get("userTypeId")?.value!;

    this.createUser(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== "") {
            this.uploadImage(this.file)
              .then(
                (res) => {},
                (reject) => {}
              )
              .catch((error) => {})
              .finally(() => {
                this.busy = false;
              });
          }
          this.toastService.success("Success");
          this.form.reset();
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

  getRolesByCompany(companyId: string) {
    return lastValueFrom(
      this.roleService.getRoleByCompanyId(companyId, 1, 1000)
    )
      .then(
        (result) => {
          this.roles = result.data;
        },
        (error) => {}
      )
      .catch((error) => {});
  }

  getStore() {
    return lastValueFrom(this.storeService.getStores(this.page, this.pageSize))
      .then(
        (result) => {
          this.stores = result.data;
        },
        (error) => {}
      )
      .catch((error) => {});
  }

  getAllRoles() {
    return lastValueFrom(this.roleService.getRoles(this.page, this.pageSize))
      .then(
        (result) => {
          this.roles = result.data;
        },
        (error) => {}
      )
      .catch((error) => {});
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
        (error) => {}
      )
      .catch((error) => {});
  }

  getUserType() {
    return lastValueFrom(this.userTypeService.getUserTypes(1, 21))
      .then(
        (result) => {
          let index = 0;
          if (this.userType != "POS Owner") {
            for (let i = 0; i < result.data.length; i++) {
              if (result.data[i].name == "POS Owner") {
                index = i;
              }
            }
            result.data.splice(index, 1);
          }
          this.userTypes = result.data;
        },
        (error) => {}
      )
      .catch((error) => {});
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

  goBack() {
    this.location.back();
  }
}
