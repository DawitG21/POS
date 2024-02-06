import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user/user.service";
import { RoleService } from "../../role/role.service";
import { SearchRole } from "../../../models/role/searchrole.model";
import { lastValueFrom } from "rxjs";
import { AuthService } from "../../../service/auth.service";
import { SearchUser } from "../../../models/user/searchuser.model";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { CreateUser } from "../../../models/user/usercreate.model";
import { Location } from "@angular/common";
import { UserType } from "../../../models/usertypes/usertype.model";
import { StoreService } from "../../store/store.service";
import { UserTypeService } from "../../usertypes/usertypes.service";
import { Store } from "../../../models/store/store.model";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  model: CreateUser = new CreateUser();
  roles?: SearchRole[];
  stores?: Store[];
  userTypes?: UserType[];
  user!: SearchUser;
  imageUrl!: string;
  busy: boolean = true;
  fileName?: string;
  file!: File;
  page: number = 1;
  pageSize: number = 10;
  storedUserType!: string;
  companyId!: string;

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required, Validators.email]),
    avatar: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
    roleId: new FormControl("", [Validators.required]),
    userTypeId: new FormControl("", [Validators.required]),
    storeId: new FormControl("", [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private storeService: StoreService,
    private userTypeService: UserTypeService,
    private authService: AuthService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location,
    private storageService: StorageService,
    private keyService: KeyService
  ) {}
  ngOnInit(): void {
    this.busy = true;
    this.user = this.authService.getUserObject;
    this.companyId = this.authService.getCompanyId;
    this.storedUserType = this.storageService.getData(
      this.keyService.USERTYPE_NAME
    );
    this.imageUrl = this.userService.getUserImage();
    this.populateData(this.user);
    this.authService.deleteUserObject();
    this.getRolesByCompany();
    this.validateCalls();
    this.getUserType();
    this.busy = false;
  }

  validateCalls() {
    this.busy = true;
    if (this.storedUserType == "POS Owner") {
      this.getStore();
    }
    if (this.storedUserType == "Company Admin") {
      this.getStoresByCompanyId(this.companyId);
    }
  }

  getFile(event: any) {
    console.log(event);
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  uploadLogo(file: File) {
    return lastValueFrom(this.userService.uploadUserImage(file));
  }

  update(user: CreateUser) {
    return lastValueFrom(this.userService.updateUser(user));
  }

  updateUser() {
    this.busy = true;
    this.model.name = this.form.get("name")?.value!;
    this.model.username = this.form.get("username")?.value!;
    this.model.avatar = this.fileName ?? "";
    this.model.status = this.form.get("status")?.value!;
    this.model.companyId = this.user.company.id!;
    this.model.password = this.form.get("password")?.value!;
    this.model.roleId = this.form.get("roleId")?.value!;
    this.model.id = this.user.id;

    console.log(this.model);

    this.update(this.model)
      .then((result) => {
        if (this.model.avatar !== this.user.avatar) {
          console.log("called");
          this.uploadLogo(this.file).then((res) => {});
        }
        this.toastService.success("Success");
        this.location.back();
      })
      .catch((error) => {
        this.toastService.error(this.messageService.serverError);
      })
      .finally(() => {
        this.busy = false;
      });
  }

  getRolesByCompany() {
    return lastValueFrom(
      this.roleService.getRoleByCompanyId(this.user!.company!.id!, 1, 1000)
    )
      .then(
        (result) => {
          this.roles = result.data;
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

  getStore() {
    return lastValueFrom(this.storeService.getStores(1, 21))
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

  getUserType() {
    return lastValueFrom(this.userTypeService.getUserTypes(1, 21))
      .then(
        (result) => {
          this.userTypes = result.data;
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  populateData(arg: SearchUser) {
    this.form.get("name")?.setValue(arg.name);
    this.form.get("username")?.setValue(arg.username);
    this.form.get("status")?.setValue(arg.status!);
    this.form.get("roleId")?.setValue(arg.role.id);
    this.form.get("userTypeId")?.setValue(arg.userTypeId);
    this.form.get("storeId")?.setValue(arg.store.id);
    this.fileName = arg.avatar;
  }

  goBack() {
    this.location.back();
  }
}
