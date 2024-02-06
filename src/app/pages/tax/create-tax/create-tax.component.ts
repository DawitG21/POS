import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { TaxModel } from "../../../models/tax/taxs.model";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { CreateTaxService } from "./create_tax.service";
import { Location } from "@angular/common";
import { lastValueFrom } from "rxjs";

@Component({
  selector: "app-create-tax",
  templateUrl: "./create-tax.component.html",
  styleUrls: ["./create-tax.component.css"],
})
export class CreateTaxComponent implements OnInit {

  busy: boolean = true;
  userId!: string;
  tax: TaxModel = new TaxModel({});

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    rate: new FormControl(0, [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  constructor(
    private apiService: CreateTaxService,
    private toastService: ToastService,
    private location: Location,
    private keyService: KeyService,
    private storageService: StorageService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.busy = false;
  }

  create(tax: TaxModel) {
    return lastValueFrom(this.apiService.saveTax(tax));
  }

  onSubmit() {
    this.busy = true;
    this.tax.name = this.form.get('name')?.value!;
    this.tax.userId = this.userId;
    this.tax.description = this.form.get('description')?.value!;
    this.tax.rate = this.form.get('rate')?.value!;

    this.create(this.tax).then((result) => {
      this.toastService.success("Success");
      this.form.reset();
    }, (reject) => {
      this.toastService.error(this.messageService.serverError);
    }).catch((error) => {
      this.toastService.error(this.messageService.serverError);
    }).finally(() => {
      this.busy = false;
    });
  }

  goBack() {
    this.location.back();
  }
}
