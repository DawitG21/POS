import { Component, OnInit } from "@angular/core";
import { KeyService } from "../../../service/key.service";
import { StorageService } from "../../../service/storage.service";

import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { ListOfUnits } from "../../../models/units/units_list.model";
import { AllUnitService } from "../unit.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-unit",
  templateUrl: "./edit-unit.component.html",
  styleUrls: ["./edit-unit.component.css"],
})
export class EditUnitComponent implements OnInit {
  unit!: ListOfUnits;
  [x: string]: any;
  model!: ListOfUnits;
  userId!: string;
  busy: boolean = true;

  constructor(
    private storageService: StorageService,
    private unitService: AllUnitService,
    private router: Router,
    private keyService: KeyService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    shortname: new FormControl("", [Validators.required]),
    baseUnit: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  ngOnInit(): void {
    this.busy = true;
    this.unit = this.storageService.getData(this.keyService.UNIT_KEY);
    this.storageService.deleteData(this.keyService.UNIT_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.busy = false;
    this.populateData(this.unit);
  }

  edit(unit: ListOfUnits) {
    return lastValueFrom(this.unitService.edit(unit));
  }

  save() {
    this.busy = true;

    this.model = new ListOfUnits(this.unit);
    this.model.name = this.form.get("name")!.value!;
    this.model.shortname = this.form.get("shortname")!.value!;
    this.model.baseUnit = this.form.get("baseUnit")!.value!;
    this.model.status = this.form.get("status")!.value!;
    this.model.id = this.form.get("id")!.value!;

    this.edit(this.model)
      .then(
        (result) => {
          this.toastService.success("Success");
          this.router.navigate(["/pages/unit"]);
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

  populateData(arg: ListOfUnits) {
    if (arg) {
      this.form.get("id")?.setValue(arg.id);
      this.form.get("name")?.setValue(arg.name);
      this.form.get("shortname")?.setValue(arg.shortname);
      this.form.get("baseUnit")?.setValue(arg.baseUnit);
      this.form.get("status")?.setValue(arg.status);
    }
  }

  goBack() {
    this.location.back();
  }
}
