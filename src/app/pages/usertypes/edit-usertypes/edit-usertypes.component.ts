import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { UserType } from "../../../models/usertypes/usertype.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserTypeService } from "../usertypes.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-usertypes",
  templateUrl: "./edit-usertypes.component.html",
  styleUrls: ["./edit-usertypes.component.css"],
})
export class EditUsertypesComponent implements OnInit {
  userType!: UserType;
  [x: string]: any;
  model!: UserType;
  busy: boolean = true;
  userId!: string;
  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private userTypeService: UserTypeService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userType = this.storageService.getData(this.keyService.USERTYPE_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.storageService.deleteData(this.keyService.USERTYPE_KEY);
    this.populateData(this.userType);
    this.busy = false;
  }

  edit(UserType: UserType) {
    return lastValueFrom(this.userTypeService.edit(UserType));
  }

  save() {
    this.busy = true;
    this.model = new UserType();
    this.model.name = this.form.get("name")?.value!;
    this.model.id = this.form.get("id")?.value!;
    this.model.userId = this.userId;

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

  populateData(arg: UserType) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
  }

  goBack() {
    this.location.back();
  }
}
