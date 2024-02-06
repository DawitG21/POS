import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RestaurantTableService } from "../restaurant-table.service";
import { RestaurantTable } from "../../../models/restaurant-table/restaurant-table.model";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-restaurant-table",
  templateUrl: "./edit-restaurant-table.component.html",
  styleUrls: ["./edit-restaurant-table.component.css"],
})
export class EditRestaurantTableComponent implements OnInit {
  restaurantTable!: RestaurantTable;
  [x: string]: any;

  model!: RestaurantTable;
  userId!: string;
  companyId!: string;
  busy: boolean = true;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private restaurantTableService: RestaurantTableService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.restaurantTable = this.storageService.getData(
      this.keyService.RESTAURANT_TABLE_KEY
    );
    this.storageService.deleteData(this.keyService.RESTAURANT_TABLE_KEY);
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.populateData(this.restaurantTable);
    this.busy = false;
  }

  edit(restaurantTable: RestaurantTable) {
    return lastValueFrom(this.restaurantTableService.edit(restaurantTable));
  }

  save() {
    this.busy = true;
    this.model = new RestaurantTable();
    this.model.id = this.form.get("id")!.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.userId = this.userId;
    this.model.companyId = this.restaurantTable.company.id;
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

  populateData(arg: RestaurantTable) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
  }

  goBack() {
    this.location.back();
  }
}
