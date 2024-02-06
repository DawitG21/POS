import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Company } from "../../../models/company/company.model";
import { ToastService } from "../../../service/toast.service";
import { Address } from "../../../models/address.model";
import { Phone } from "../../../models/phone.model";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { ViewCompanyService } from "../view-company/view_company.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-create-company",
  templateUrl: "./create-company.component.html",
  styleUrls: ["./create-company.component.css"],
})
export class CreateCompanyComponent {
  [x: string]: any;

  model: Company = new Company();
  address!: Address;
  phone!: Phone;
  code!: string;
  number!: number;
  fileName?: string;
  file!: File;
  busy: boolean = false;

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    tinnumber: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl([
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^251\d{9}$/),
    ]),
    city: new FormControl("", [Validators.required]),
    avatar: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private viewCompanyService: ViewCompanyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  create(company: Company) {
    return lastValueFrom(this.viewCompanyService.createCompany(company));
  }

  uploadLogo(file: File) {
    return lastValueFrom(this.viewCompanyService.uploadImage(file));
  }

  createCompany() {
    this.busy = true;
    const cityValue = `${this.form.get("city")?.value}`;
    const countryValue = `${this.form.get("country")?.value}`;
    const phoneNumber = `${this.form.get("phoneNumber")?.value}`;

    if (typeof phoneNumber === "string") {
      this.code = `+${phoneNumber.slice(0, 3)}`;

      this.number = Number(phoneNumber.slice(3));
    }

    this.address = new Address(cityValue, countryValue);
    this.phone = new Phone(this.code, this.number);

    this.model.name = this.form.get("name")?.value!;
    this.model.tinnumber = this.form.get("tinnumber")?.value!;
    this.model.avatar = this.fileName ?? "";
    this.model.email = this.form.get("email")!.value!;
    this.model.address = this.address;
    this.model.status = this.form.get("status")!.value!;
    this.model.phone = this.phone;

    this.create(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== "") {
            this.uploadLogo(this.file)
              .then(
                (res) => {},
                (reject) => {}
              )
              .catch((error) => {})
              .finally(() => {
                this.busy = false;
              });
          }
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
