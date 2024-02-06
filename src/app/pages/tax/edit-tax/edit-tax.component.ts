import { Component, OnInit } from "@angular/core";
import { KeyService } from "../../../service/key.service";
import { StorageService } from "../../../service/storage.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { ListOfTax } from "../../../models/tax/tax_list.model";
import { AllTaxService } from "../tax.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-tax",
  templateUrl: "./edit-tax.component.html",
  styleUrls: ["./edit-tax.component.css"],
})
export class EditTaxComponent implements OnInit {
  tax!: ListOfTax;
  [x: string]: any;
  model!: ListOfTax;
  userId!: string;
  busy: boolean = true;

  constructor(
    private storageService: StorageService,
    private taxService: AllTaxService,
    private router: Router,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    rate: new FormControl(0, [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
    this.busy = true;
    this.tax = this.storageService.getData(this.keyService.Tax_KEY);
    this.storageService.deleteData(this.keyService.Tax_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.populateData(this.tax);
    this.busy = false;
  }

  edit(tax: ListOfTax) {
    return lastValueFrom(this.taxService.edit(tax));
  }

  save() {
    this.busy = true;
    this.model = new ListOfTax(this.tax);
    this.model.name = this.form.get("name")!.value!;
    this.model.rate = +this.form.get("rate")!.value!;
    this.model.description = this.form.get("description")!.value!;
    this.model.id = this.form.get("id")!.value!;
    this.userId = this.userId;

    this.edit(this.model)
      .then(
        (result) => {
          this.toastService.success("Success");
          this.router.navigate(["/pages/tax"]);
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

  populateData(arg: ListOfTax) {
    if (arg) {
      this.form.get("id")?.setValue(arg.id);
      this.form.get("name")?.setValue(arg.name);
      this.form.get("rate")?.setValue(arg.rate);
      this.form.get("description")?.setValue(arg.description);
    }
  }

  goBack() {
    this.location.back();
  }
}
