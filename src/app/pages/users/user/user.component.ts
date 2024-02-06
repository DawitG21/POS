import { Component, OnInit, ViewChild } from "@angular/core";
import { CreateUser } from "../../../models/user/usercreate.model";
import { RoleService } from "../../role/role.service";
import { UserService } from "./user.service";
import { last, lastValueFrom } from "rxjs";
import { SearchUser } from "../../../models/user/searchuser.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  users?: SearchUser[];
  user?: SearchUser;
  userId!: string;
  pages: number[] = [];
  imageUrl!: string;
  busy: boolean = true;
  searchUserTerm: string = "";
  claims: any;
  userType!: string;
  companyId!: string;
  startPage = 1;
  endPage = 10;
  
  @ViewChild("viewModal") viewModal: any;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private keyService: KeyService,
    private messageService: MessageService,
    private toastService: ToastService,
    private router: Router,
    private modalService: NgbModal
  ) {
    //getImage Url
  }
  ngOnInit(): void {
    this.claims = this.storageService.getData(this.keyService.CLAIMS_KEY);
    this.userType = this.storageService.getData(this.keyService.USERTYPE_NAME);
    this.imageUrl = this.userService.getUserImage();
    this.companyId = this.storageService.getData(this.keyService.COMPANYID_KEY);
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getUserByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllUsers();
    }
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;

    if(this.pageSize == 20)
    {
      this.page = Math.round(this.page/2);

      if(this.page%10 == 0) {
        this.startPage = this.page - 9;
        this.endPage = this.page;
      }
      else {
        this.startPage = this.page - this.page%10 + 1;
        this.endPage = this.startPage + 9;
      }

      if(this.endPage > this.pages.length/2) {
        this.endPage = Math.round(this.pages.length/2);
      }
      else {
        this.endPage = this.startPage + 9;
      }
    }
    else if (this.pageSize == 10)
    {
      this.page = this.page*2 - 1;
      this.startPage = this.page - this.page%10 + 1;
      this.endPage = this.startPage + 9;

      if(this.endPage > this.pages.length*2) {
        this.endPage = this.pages.length*2;
      }
      else {
        this.endPage = this.startPage + 9;
      }
    }
  
    // console.log("Page" + this.page);
    // console.log("Start Page" + this.startPage);
    // console.log("End Page" + this.endPage);
    if (this.userType == "Company User" || this.userType == "Company Admin") {
      this.getUserByCompanyId(this.companyId);
    }
    if (this.userType == "POS Owner") {
      this.getAllUsers();
    }   
  }
  

  setPageRangeSubtract(page:number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if(page === 1)
      {
        this.startPage = this.page;
        this.endPage = this.startPage + 9;
      }
      else
      {
        if(this.endPage === this.pages.length)
        {
          this.endPage = this.endPage - this.endPage%10;
          this.startPage = this.endPage - 9;
        }
        else
        {
          this.startPage -= 10;
          this.endPage -= 10;
        }
      }
      //this.getUsersPagination(this.page, this.pageSize);
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getUserByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllUsers();
      }     //console.log(this.startPage, this.endPage);
      //console.log(this.page);
    }
  }

  setPageRangeAdd(page:number) {
    if (page >= 1 && page < this.pages.length) {
      this.page = page + 10;
      if(this.page >= this.pages.length)
      {
        page = this.pages.length;
        this.page = this.pages.length;
        this.endPage = this.pages.length;
        if(this.endPage%10 === 0)
          this.startPage = this.endPage - 9;
        else
          this.startPage = this.pages.length - this.pages.length%10 + 1;
      }
      else
      {
        this.startPage += 10;
        this.endPage += 10;
        if(this.endPage > this.pages.length)
          this.endPage = this.pages.length;
      }
      //this.getUsersPagination(this.page, this.pageSize);
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getUserByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllUsers();
      }      //console.log(this.startPage, this.endPage);
      //console.log(this.page);
    }
  }

  setCurrentPage(page: number) {
    // Ensure the clicked page is within the valid range
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      //this.getUsersPagination(this.page, this.pageSize);
      if (this.userType == "Company User" || this.userType == "Company Admin") {
        this.getUserByCompanyId(this.companyId);
      }
      if (this.userType == "POS Owner") {
        this.getAllUsers();
      }    
    }
    //console.log(this.page);
  }

  getUsersPagination(page: number, pageSize: number) {
    this.busy = true;
    return lastValueFrom(this.userService.getUsers(page, pageSize))
      .then(
        (result) => {
          if (this.users?.length === 0) {
            this.users = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.users = [];
            this.users = result.data;
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

      }).finally(() => {
        this.busy = false;
      });
  }

  getUserById() {
    return lastValueFrom(
      this.userService.getUserById(this.userId)
    ).then(
      (result) => {
        this.user = result;
      }, (reject) => {
        this.toastService.error(this.messageService.serverError);

      }
    ).catch((error) => {
      this.toastService.error(this.messageService.serverError);

    });
  }

  getUserByCompanyId(companyId: string) {
    this.busy = true;
    return lastValueFrom(
      this.userService.getUserByCompanyId(companyId, this.page, this.pageSize)
    )
      .then(
        (result) => {
          if (this.users?.length === 0) {
            this.users = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.users = [];
            this.users = result.data;
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

  getAllUsers() {
    this.busy = true;
    return lastValueFrom(
      this.userService.getUsers(this.page, this.pageSize)
    )
      .then(
        (result) => {
          if (this.users?.length === 0) {
            this.users = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.users = [];
            this.users = result.data;
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

  //update User

  updateUser(user: CreateUser) {
    return lastValueFrom(this.userService.updateUser(user));
  }

  callUpdateUser() { }

  //customise created on date 14/12/23
  formatDateToCustomFormat(dateString: string): string {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  //for view icon
  view(user: SearchUser) {
    this.userId = user.id!;
    this.user = user;
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

  //for update icon
  update(user: SearchUser) {
    this.userId = user.id!;
    this.user = user;
    this.storageService.setData(this.keyService.USEROBJECT_KEY, user);
    this.router.navigate(["user/edit-user"]);
  }

  createUser() {
    this.router.navigate(["user/create-user"]);
  }

  deleteUser(userId: string) {
    return lastValueFrom(this.userService.deleteUser(userId));
  }

  delete(user: SearchUser) {
    this.busy = true;
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
        this.deleteUser(user.id!)
          .then(
            (result) => {
              this.users = this.users?.filter(use => use !== user);            
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
