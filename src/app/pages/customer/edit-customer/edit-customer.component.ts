import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { Address } from "../../../models/address.model";
import { Phone } from "../../../models/phone.model";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { CustomerService } from "../customer.service";
import { Customer } from "../../../models/customer/customer.model";
import { Location } from "@angular/common";
@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.css"],
})
export class EditCustomerComponent {
  customer!: Customer;
  [x: string]: any;

  model!: Customer;
  address!: Address;
  phone!: Phone;
  code!: string;
  number!: number;
  userId!: string;
  busy: boolean = true;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl(0, [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^251\d{9}$/),
    ]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private customerService: CustomerService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.customer = this.storageService.getData(this.keyService.CUSTOMER_KEY);
    this.storageService.deleteData(this.keyService.CUSTOMER_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.populateData(this.customer);
    this.busy = false;
  }

  edit(customer: Customer) {
    return lastValueFrom(this.customerService.edit(customer));
  }

  save() {
    this.busy = true;
    const cityValue = `${this.form.get("city")?.value}`;
    const countryValue = `${this.form.get("country")?.value}`;
    const phoneNumber = `${this.form.get("phoneNumber")?.value}`;

    this.model = new Customer();
    if (typeof phoneNumber === "string") {
      this.code = `+${phoneNumber.slice(0, 3)}`;

      this.number = Number(phoneNumber.slice(3));
    }

    this.address = new Address(cityValue, countryValue);
    this.phone = new Phone(this.code, this.number);
    this.model.address = this.address;
    this.model.phone = this.phone;
    this.model.userId = this.userId;
    this.model.name = this.form.get("name")?.value!;
    this.model.email = this.form.get("email")?.value!;
    this.model.id = this.form.get("id")?.value!;
    this.model.companyId = this.customer.companyId;

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

  populateData(arg: Customer) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
    this.form.get("email")?.setValue(arg.email);
    var phone = Number(arg.phone.code + arg.phone.number.toString());
    this.form.get("phoneNumber")?.setValue(phone);
    this.form.get("city")?.setValue(arg.address.city);
    this.form.get("country")?.setValue(arg.address.country);
  }

  goBack() {
    this.location.back();
  }
}
