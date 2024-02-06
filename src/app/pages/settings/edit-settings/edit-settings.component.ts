import { Component, OnInit } from "@angular/core";
import { KeyService } from "../../../service/key.service";
import { StorageService } from "../../../service/storage.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { SettingsList } from "../../../models/settings/settings_list.model";
import { AllSettingsService } from "../settings.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-settings",
  templateUrl: "./edit-settings.component.html",
  styleUrls: ["./edit-settings.component.css"],
})
export class EditSettingsComponent implements OnInit {
  unit!: SettingsList;
  [x: string]: any;
  model!: SettingsList;
  userId!: string;
  companyId!: string;
  busy: boolean = true;

  constructor(
    private storageService: StorageService,
    private settingsService: AllSettingsService,
    private router: Router,
    private keyService: KeyService,

    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    cashonhand: new FormControl("", [Validators.required]),
    cogs: new FormControl("", [Validators.required]),
    discount: new FormControl("", [Validators.required]),
    vat: new FormControl("", [Validators.required]),
    accountsreceivable: new FormControl("", [Validators.required]),
    accountspayable: new FormControl("", [Validators.required]),
    salesrevenue: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
    this.busy = true;
    this.unit = this.storageService.getData(this.keyService.SETTINGS_KEY);
    this.storageService.deleteData(this.keyService.SETTINGS_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.busy = false;
    this.populateData(this.unit);
  }

  edit(setting: SettingsList) {
    return lastValueFrom(this.settingsService.edit(setting));
  }

  save() {
    this.busy = true;

    this.model = new SettingsList(this.unit);
    this.model.cashonhand = this.form.get("cashonhand".toString())!.value!;
    this.model.cogs = this.form.get("cogs".toString())!.value!;
    this.model.discount = this.form.get("discount".toString())!.value!;
    this.model.vat = this.form.get("vat".toString())!.value!;
    this.model.accountsreceivable = this.form.get(
      "accountsreceivable".toString()
    )!.value!;
    this.model.accountspayable = this.form.get(
      "accountspayable".toString()
    )!.value!;
    this.model.salesrevenue = this.form.get("salesrevenue".toString())!.value!;

    this.model.id = this.form.get("id")!.value!;

    this.edit(this.model)
      .then(
        (result) => {
          this.toastService.success("Success");
          this.router.navigate(["/pages/settings"]);
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

  populateData(arg: SettingsList) {
    if (arg) {
      this.form.get("id")?.setValue(arg.id);
      this.form.get("cashonhand")?.setValue(arg.cashonhand.toString());
      this.form.get("cogs")?.setValue(arg.cogs.toString());
      this.form.get("discount")?.setValue(arg.discount.toString());
      this.form.get("vat")?.setValue(arg.vat.toString());
      this.form
        .get("accountsreceivable")
        ?.setValue(arg.accountsreceivable.toString());

      this.form
        .get("accountspayable")
        ?.setValue(arg.accountspayable.toString());

      this.form.get("salesrevenue")?.setValue(arg.salesrevenue.toString());
    }
  }

  goBack() {
    this.location.back();
  }
}
