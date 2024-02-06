import { Component, OnInit } from "@angular/core";
import { KeyService } from "../../../service/key.service";
import { StorageService } from "../../../service/storage.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ListOfAccounts } from "../../../models/accounts/accounts_list.model";
import { AccountsService } from "../accounts.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-account",
  templateUrl: "./edit-account.component.html",
  styleUrls: ["./edit-account.component.css"],
})
export class EditAccountComponent implements OnInit {
  accountType!: ListOfAccounts;
  [x: string]: any;
  model!: ListOfAccounts;
  userId!: string;
  companyId!: string;
  busy: boolean = true;

  constructor(
    private storageService: StorageService,
    private taxService: AccountsService,
    private router: Router,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    accountname: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    accountnumber: new FormControl("", [Validators.required]),
    accountType: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  ngOnInit(): void {
    this.busy = true;
    this.accountType = this.storageService.getData(this.keyService.Account_KEY);
    this.storageService.deleteData(this.keyService.Account_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.busy = false;
    this.populateData(this.accountType);
  }

  edit(tax: ListOfAccounts) {
    return lastValueFrom(this.taxService.edit(tax));
  }

  save() {
    this.busy = true;

    this.model = new ListOfAccounts(this.accountType);
    this.model.acname = this.form.get("accountname")!.value!;
    this.model.acnumber = this.form.get("accountnumber")!.value!;
    this.model.actype = this.form.get("accountType")!.value!;
    this.model.status = this.form.get("status")!.value!;
    this.model.id = this.form.get("id")!.value!;
    this.model.companyId = this.accountType.company.id;

    this.edit(this.model)
      .then(
        (result) => {
          this.toastService.success("Success");
          this.router.navigate(["/pages/account"]);
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

  populateData(arg: ListOfAccounts) {
    if (arg) {
      this.form.get("id")?.setValue(arg.id);
      this.form.get("accountname")?.setValue(arg.acname);
      this.form.get("accountnumber")?.setValue(arg.acnumber);
      this.form.get("accountType")?.setValue(arg.actype);
      this.form.get("status")?.setValue(arg.status);
    }
  }

  goBack() {
    this.location.back();
  }
}
