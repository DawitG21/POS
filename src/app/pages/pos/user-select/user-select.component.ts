import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../users/user/user.service';
import { MessageService } from '../../../service/message.service';
import { ToastService } from '../../../service/toast.service';
import { SearchUser } from '../../../models/user/searchuser.model';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AppSettings } from '../../../service/app-settings.service';
import { StorageService } from '../../../service/storage.service';
import { KeyService } from '../../../service/key.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit, OnDestroy {


  users?: SearchUser[];
  busy: boolean = true;
  imageUrl!: string;
  companyId!: string;
  constructor
    (
      private userService: UserService,
      private messageService: MessageService,
      private toastService: ToastService,
      private router: Router,
      private appSettings: AppSettings,
      private storageService: StorageService,
      private keyService: KeyService,

    ) {

  }

  ngOnInit(): void {
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
    this.appSettings.appContentFullHeight = true;
    this.companyId = this.storageService.getData(this.keyService.COMPANYID_KEY);
    this.imageUrl = this.userService.getUserImage();
    this.getUserByCompanyId();
  }
  ngOnDestroy() {
    this.appSettings.appHeaderNone = false;
    this.appSettings.appSidebarNone = false;
    this.appSettings.appContentClass = '';
    this.appSettings.appContentFullHeight = false;
  }

  getUserByCompanyId() {
    this.busy = true;
    return lastValueFrom(
      this.userService.getUserByCompanyId(this.companyId, 1, 10)
    ).then(
      (result) => {
        if (this.users?.length === 0) {
          this.users = result.data;

        } else {
          this.users = [];
          this.users = result.data;

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

  moveToTable(id: string) {
    this.storageService.setData(this.keyService.WAITORID_KEY, id);
    this.router.navigate(["pos/select-table"]);

  }



}
