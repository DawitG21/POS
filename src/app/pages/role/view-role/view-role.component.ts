import { Component, OnInit, ViewChild } from "@angular/core";
import { RoleService } from "../role.service";
import { firstValueFrom, lastValueFrom } from "rxjs";

import { SearchResult } from "../../../interfaces/search-result";
import { Router } from "@angular/router";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import Swal from "sweetalert2";
import { Role } from "../../../models/role/role.model";
import { SearchRole } from "../../../models/role/searchrole.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-view-role",
  templateUrl: "./view-role.component.html",
  styleUrls: ["./view-role.component.css"],
})
export class ViewRoleComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  rolesData?: Role[];
  roles?: SearchRole[];
  busy: boolean = true;
  role!: Role;
  searchRoleTerm: string = "";
  claims: any;
  userType!: string;
  companyId!: string;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private roleService: RoleService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private keyService: KeyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.companyId = this.authService.getCompanyId;
    console.log(this.companyId);
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getRoleByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllRole();
    }
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getRoleByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllRole();
    }
  }

  setCurrentPage(page: number) {
    // Ensure the clicked page is within the valid range
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getRoleByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllRole();
      }
    }
  }

  public getRole(): Promise<any> {
    return firstValueFrom(this.roleService.getRoles(this.page, this.pageSize));
  }

  getAllRole(): void {
    this.busy = true;
    this.getRole()
      .then(
        (result: SearchResult) => {
          if (this.roles?.length === 0) {
            this.roles = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.roles = [];
            this.roles = result.data;
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

  getRoleByCompanyId(companyId: string) {
    this.busy = true;
    return lastValueFrom(
      this.roleService.getRoleByCompanyId(companyId, this.page, this.pageSize)
    )
      .then(
        (result) => {
          if (this.roles?.length === 0) {
            this.roles = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.roles = [];
            this.roles = result.data;
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

  formatDateToCustomFormat(dateString: string): string {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  goCreateRole() {
    this.route.navigate(["role/create"]);
  }

  goEditRole(role: Role) {
    this.route.navigate(["role/edit"]);
    this.storageService.setData(this.keyService.ROLE_KEY, role);
  }

  view(role: Role) {
    this.role = role;
    // this.userId = user.id!;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {
          // Handle close (if needed)
        },
        (reason) => {
          // Handle dismiss (if needed)
        }
      );
  }

  public deleteRole(id: string): Promise<any> {
    return firstValueFrom(this.roleService.delete(id));
  }

  delete(role: Role) {
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
        this.busy = true;
        this.deleteRole(role.id)
          .then(
            (result) => {
              this.rolesData = this.rolesData?.filter(
                (newRole) => newRole !== role
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
