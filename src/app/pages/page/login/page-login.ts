import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppSettings } from '../../../service/app-settings.service';
import { Login } from '../../../models/login.model';
import { BroadcastMessage } from '../../../models/broadcast-message';
import { LoginService } from './login.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { StorageService } from '../../../service/storage.service';
//import { ToastService } from '../../../service/toast.service';
import { MessageService } from '../../../service/message.service';
import { KeyService } from '../../../service/key.service';
import { ToastService } from '../../../service/toast.service';
import { BroadcastService } from '../../../service/broadcast.service';

@Component({
  selector: 'page-login',
  templateUrl: './page-login.html'
})

  export class LoginPage {
    model!: Login;
    form = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });
    constructor(
      private router: Router,
      private appSettings: AppSettings,
      private loginService: LoginService,
      private storageService: StorageService,
      private toastService: ToastService,
      private messageService: MessageService,
      private keyService: KeyService,
      private broadcastService: BroadcastService,
    ) { }

    ngOnInit() {
      this.appSettings.appSidebarNone = true;
      this.appSettings.appHeaderNone = true;
      this.appSettings.appContentClass = 'p-0';
    }

    ngOnDestroy() {
      this.appSettings.appSidebarNone = false;
      this.appSettings.appHeaderNone = false;
      this.appSettings.appContentClass = '';
    }

    formSubmit(f: NgForm) {
      this.router.navigate(['/']);
    }

    login(login: Login) {
      return lastValueFrom(this.loginService.login(login));
    }

    save() {
      this.model = this.form.value as Login;

      if (this.model.username.trim() === '' && this.model.password.trim() === '') {
        console.error('Username and password are required.');
        // Display an error message to the user, or handle it as needed.
        this.toastService.error('Email and password are required.');
        return;
      }
      if (this.model.username.trim() === '') {
        this.toastService.error('Email required.');
        return;
      }

      if (this.model.password.trim() === '') {
        this.toastService.error(' password  required.');
        return;
      }



      this.login(this.model)
        .then((result) => {

          if (result.id) {
            this.storageService.setData(this.keyService.TOKEN_KEY, result.authorization.token);
            this.storageService.setData(this.keyService.COMPANYID_KEY, result.company.id);
            this.storageService.setData(this.keyService.EMAIL_KEY, result.username);
            this.storageService.setData(this.keyService.USER_NAME_KEY, result.name);
            this.storageService.setData(this.keyService.AVATAR_KEY, result.avatar);
            this.storageService.setData(this.keyService.USERID_KEY, result.id);
            this.storageService.setData(this.keyService.STORE_ID, result.store.id);
            this.storageService.setData(this.keyService.CLAIMS_KEY_ROW, result.claims);
            this.storageService.setData(this.keyService.COMPANYOBJECT_KEY, result.company);
            this.storageService.setData(this.keyService.USERTYPE_ID, result.userType.id);
            this.storageService.setData(this.keyService.USERTYPE_NAME, result.userType.name);
            console.log(result);
            this.broadcastService.broadcastTask(new BroadcastMessage("isLoggedIn", true));


            let claims = result.claims.reduce((acc, currentValue) => {
              acc[currentValue] = true;
              return acc;
            }, {});
            this.storageService.setData(this.keyService.CLAIMS_KEY, claims);
            this.router.navigate(['dashboard']);
          }
          // additional success handling if needed
          this.toastService.success(this.messageService.LoginSuccess);


        })
        .catch((reject) => {
          console.error('Unsuccessful login:', reject);
          // additional error handling if needed
          this.toastService.error(this.messageService.LoginError);


        })
        .finally(() => {
          // any cleanup or finalization code
        });
    }
  }
