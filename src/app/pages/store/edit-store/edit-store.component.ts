import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { Store } from "../../../models/store/store.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Address } from "../../../models/address.model";
import { Phone } from "../../../models/phone.model";
import { StoreService } from "../store.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-store",
  templateUrl: "./edit-store.component.html",
  styleUrls: ["./edit-store.component.css"],
})
export class EditStoreComponent implements OnInit {
  store!: Store;
  [x: string]: any;

  model!: Store;
  address!: Address;
  phone!: Phone;
  code!: string;
  number!: number;
  fileName?: string;
  file!: File;
  imgUrl!: string;
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
    avatar: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private storeService: StoreService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.store = this.storageService.getData(this.keyService.STORE_KEY);
    this.storageService.deleteData(this.keyService.STORE_KEY);
    this.imgUrl = this.storeService.getStoreImage();
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.populateData(this.store);
    this.busy = false;
  }

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  uploadAvatar(file: File) {
    return lastValueFrom(this.storeService.uploadImage(file));
  }

  edit(store: Store) {
    return lastValueFrom(this.storeService.edit(store));
  }

  save() {
    this.busy = true;
    const cityValue = `${this.form.get("city")?.value}`;
    const countryValue = `${this.form.get("country")?.value}`;
    const phoneNumber = `${this.form.get("phoneNumber")?.value}`;

    this.model = new Store();
    if (typeof phoneNumber === "string") {
      this.code = `+${phoneNumber.slice(0, 3)}`;

      this.number = Number(phoneNumber.slice(3));
    }

    this.address = new Address(cityValue, countryValue);
    this.phone = new Phone(this.code, this.number);
    this.model.address = this.address;
    this.model.phone = this.phone;
    this.model.avatar = this.fileName ?? "";
    this.model.userId = this.userId;
    this.model.status = this.form.get("status")!.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.id = this.form.get("id")?.value!;

    this.edit(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== this.store.avatar) {
            this.uploadAvatar(this.file).then((res) => {});
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

  populateData(arg: Store) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
    var phone = Number(arg.phone.code + arg.phone.number.toString());
    this.form.get("phoneNumber")?.setValue(phone);
    this.form.get("city")?.setValue(arg.address.city);
    this.form.get("country")?.setValue(arg.address.country);
    this.form.get("status")?.setValue(arg.status);
    this.fileName = arg.avatar;
  }

  goBack() {
    this.location.back();
  }
}
