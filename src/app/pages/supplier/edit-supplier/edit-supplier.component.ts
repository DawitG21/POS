import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Address } from "../../../models/address.model";
import { Phone } from "../../../models/phone.model";
import { SupplierService } from "../supplier.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { Supplier } from "../../../models/supplier/supllier.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-supplier",
  templateUrl: "./edit-supplier.component.html",
  styleUrls: ["./edit-supplier.component.css"],
})
export class EditSupplierComponent implements OnInit {
  supplier!: Supplier;
  [x: string]: any;

  model!: Supplier;
  address!: Address;
  phone!: Phone;
  code!: string;
  number!: number;
  userId!: string;
  busy: boolean = true;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl(0, [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^251\d{9}$/),
    ]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private supplierService: SupplierService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.supplier = this.storageService.getData(this.keyService.SUPPLIER_KEY);
    this.storageService.deleteData(this.keyService.SUPPLIER_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.populateData(this.supplier);
    this.busy = false;
  }

  edit(supplier: Supplier) {
    return lastValueFrom(this.supplierService.edit(supplier));
  }

  save() {
    this.busy = true;
    const cityValue = `${this.form.get("city")?.value}`;
    const countryValue = `${this.form.get("country")?.value}`;
    const phoneNumber = `${this.form.get("phoneNumber")?.value}`;

    this.model = new Supplier();
    if (typeof phoneNumber === "string") {
      this.code = `+${phoneNumber.slice(0, 3)}`;

      this.number = Number(phoneNumber.slice(3));
    }

    this.address = new Address(cityValue, countryValue);
    this.phone = new Phone(this.code, this.number);
    this.model.address = this.address;
    this.model.phone = this.phone;
    this.model.userId = this.userId;
    this.model.status = this.form.get("status")!.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.id = this.form.get("id")?.value!;

    this.edit(this.model)
      .then(
        (result) => {
          this.toastService.success("Success");
          this.location.back();
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

  populateData(arg: Supplier) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
    var phone = Number(arg.phone.code + arg.phone.number.toString());
    this.form.get("phoneNumber")?.setValue(phone);
    this.form.get("city")?.setValue(arg.address.city);
    this.form.get("country")?.setValue(arg.address.country);
    this.form.get("status")?.setValue(arg.status);
  }

  goBack() {
    this.location.back();
  }
}
