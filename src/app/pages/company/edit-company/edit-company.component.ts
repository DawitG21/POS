import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../service/auth.service";
import { ViewCompanyService } from "../view-company/view_company.service";
import { Company } from "../../../models/company/company.model";
import { MessageService } from "../../../service/message.service";
import { ToastService } from "../../../service/toast.service";
import { lastValueFrom } from "rxjs";
import { Phone } from "../../../models/phone.model";
import { Address } from "../../../models/address.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-company",
  templateUrl: "./edit-company.component.html",
  styleUrls: ["./edit-company.component.css"],
})
export class EditCompanyComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private viewCompanyService: ViewCompanyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.company = this.authService.getCompanyObject;
    this.imageUrl = this.viewCompanyService.getCompanyImage();
    this.populateData(this.company);
    this.authService.deleteCompanyObject();
    this.busy = false;
  }

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  company!: Company;
  model: Company = new Company();
  address!: Address;
  phone!: Phone;
  busy: boolean = true;
  code!: string;
  number!: number;
  imageUrl!: string;
  fileName?: string;
  file!: File;
  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    tinnumber: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl(0, [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^251\d{9}$/),
    ]),
    city: new FormControl("", [Validators.required]),
    avatar: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  populateData(arg: Company) {
    this.form.get("name")?.setValue(arg.name);
    this.form.get("tinnumber")?.setValue(arg.tinnumber);
    this.form.get("email")?.setValue(arg.email);
    var phone = Number(arg.phone!.code + arg.phone!.number.toString());
    this.form.get("phoneNumber")?.setValue(phone);
    this.form.get("city")?.setValue(arg.address!.city);
    this.form.get("country")?.setValue(arg.address!.country);
    this.form.get("status")?.setValue(arg.status!);
    this.fileName = arg.avatar;
  }
  update(company: Company) {
    return lastValueFrom(this.viewCompanyService.updateCompany(company));
  }
  uploadLogo(file: File) {
    return lastValueFrom(this.viewCompanyService.uploadImage(file));
  }
  updateCompany() {
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
    this.model.id = this.company.id;

    this.update(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== this.company.avatar) {
            this.uploadLogo(this.file).then((res) => {});
          }
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

  goBack() {
    this.location.back();
  }
}
