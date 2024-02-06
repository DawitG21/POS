import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { CreateUserType } from "../../../models/usertypes/create-usertype.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { UserTypeService } from "../usertypes.service";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";

@Component({
  selector: "app-create-usertypes",
  templateUrl: "./create-usertypes.component.html",
  styleUrls: ["./create-usertypes.component.css"],
})
export class CreateUsertypesComponent implements OnInit {
  [x: string]: any;

  model: CreateUserType = new CreateUserType();
  userId!: string;
  companyId!: string;
  busy: boolean = true;

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private usertypeService: UserTypeService,
    private storageService: StorageService,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.busy = false;
  }

  create(userType: CreateUserType) {
    return lastValueFrom(this.usertypeService.create(userType));
  }

  save() {
    this.busy = true;
    this.model.name = this.form.get("name")?.value!;
    this.model.userId = this.userId;

    this.create(this.model)
      .then(
        (result) => {
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

  goBack() {
    this.location.back();
  }
}
