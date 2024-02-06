import { Component } from "@angular/core";

import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { RoleService } from "../role.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { Action } from "../../../models/action.model";
import { Role } from "../../../models/role/role.model";
import { Location } from "@angular/common";
import { PermissionService } from "../../permissions/permission.service";
import { SearchResult } from "../../../interfaces/search-result";
import { Permission } from "../../../models/permission/permission.model";

@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.css"],
})
export class EditRoleComponent {
  role!: Role;
  [x: string]: any;

  model!: Role;
  number!: number;
  fileName?: string;
  file!: File;
  userId!: string;
  companyId!: string;
  busy: boolean = true;
  actionData!: Action[];
  pages: number[] = [];
  page = 1;
  pageSize = 20;
  permissionData?: Permission[];
  commonClaims: string[] = [];
  selectedPermissions: any[] = [];

  form = this.fb.group({
    id: new FormControl("", [Validators.required]),
    role: ["", [Validators.required, Validators.minLength(3)]],
    description: ["", [Validators.required, Validators.minLength(3)]],
    claims: this.fb.array([]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private roleService: RoleService,
    private toastService: ToastService,
    private messageService: MessageService,
    private permissionService: PermissionService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.role = this.storageService.getData(this.keyService.ROLE_KEY);
    this.storageService.deleteData(this.keyService.ROLE_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.companyId = this.storageService.getData(this.keyService.COMPANYID_KEY);

    // Fetch permissionData and then call populateData
    this.getPermission()
      .then((result: SearchResult) => {
        if (result.data?.length === 0) {
          this.permissionData = result.data;
          this.pages = Array.from(
            { length: result.pages },
            (_, index) => index + 1
          );
        } else {
          this.permissionData = [];
          this.permissionData = result.data;
          this.pages = Array.from(
            { length: result.pages },
            (_, index) => index + 1
          );
        }

        // Now that permissionData is available, call populateData
        this.populateData(this.role);

        // Set busy to false after everything is done
        this.busy = false;
      })
      .catch((error) => {
        this.toastService.error(this.messageService.serverError);
        this.busy = false; // Make sure to set busy to false in case of an error
      });
  }

  public getPermission(): Promise<any> {
    return firstValueFrom(
      this.permissionService.getPermission(this.page, this.pageSize)
    );
  }

  get(): void {
    this.busy = true;
    this.getPermission()
      .then(
        (result: SearchResult) => {
          if (this.permissionData?.length === 0) {
            this.permissionData = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.permissionData = [];
            this.permissionData = result.data;
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

  goBack() {
    this.location.back();
  }

  populateData(arg: Role): void {
    console.log(arg);
    console.log(this.permissionData);
    const argClaims = arg.claims || [];
    this.form.get("id")!.setValue(arg.id);
    this.form.get("role")?.setValue(arg.role);
    this.form.get("description")?.setValue(arg.description);
    // Compare 'argClaims' with 'permissionData' claims array

    if (this.permissionData && this.permissionData.length > 0) {
      this.commonClaims = []; // Reset commonClaims array

      this.permissionData.forEach((permission) => {
        const permissionClaims = permission.claims || [];

        // Find common claims between argClaims and permissionClaims
        const commonClaims = argClaims.filter((claim) =>
          permissionClaims.includes(claim)
        );

        // Add common claims to the array
        this.commonClaims = this.commonClaims.concat(commonClaims);
      });
    }
  }

  edit(role: Role) {
    return lastValueFrom(this.roleService.updateRole(role));
  }

  save() {
    this.busy = true;

    // Initialize this.model if it is undefined
    this.model = this.model || {};

    this.model.userId = this.userId;
    this.model.companyId = this.role.company.id!;
    this.model.role = this.form.get("role")?.value!;
    this.model.description = this.form.get("description")?.value!;
    this.model.id = this.form.get("id")?.value!;
    this.model.claims = this.selectedPermissions;

    console.log(this.model);

    this.edit(this.model)
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
    console.log(claim);
    console.log(this.selectedPermissions);

    // Initialize selectedPermissions with all common claims
    this.commonClaims.forEach((commonClaim) => {
      if (!this.selectedPermissions.includes(commonClaim)) {
        this.selectedPermissions.push(commonClaim);
      }
    });

    if ((event.target as HTMLInputElement).checked) {
      // Add the claim to selectedPermissions only if it's not already present
      if (!this.selectedPermissions.includes(claim)) {
        this.selectedPermissions.push(claim);
      }
    } else {
      // Remove the claim from selectedPermissions
      this.selectedPermissions = this.selectedPermissions.filter(
        (selectedClaim) => selectedClaim !== claim
      );
    }
    console.log(this.selectedPermissions);
  }
}
