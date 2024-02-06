import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../../service/storage.service";
import { KeyService } from "../../../service/key.service";
import { Category } from "../../../models/category/category.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../category.service";
import { ToastService } from "../../../service/toast.service";
import { MessageService } from "../../../service/message.service";
import { lastValueFrom } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"],
})
export class EditCategoryComponent implements OnInit {
  category!: Category;
  [x: string]: any;

  model!: Category;
  fileName?: string;
  file!: File;
  userId!: string;
  busy: boolean = true;
  imgUrl!: string;

  form = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    avatar: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  constructor(
    private storageService: StorageService,
    private keyService: KeyService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.busy = true;
    this.category = this.storageService.getData(this.keyService.CATEGORY_KEY);
    this.storageService.deleteData(this.keyService.CATEGORY_KEY);
    this.imgUrl = this.categoryService.getCategoryImage();
    this.userId = this.storageService.getData(this.keyService.USERID_KEY);
    this.populateData(this.category);
    this.busy = false;
  }

  getFile(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  uploadAvatar(file: File) {
    return lastValueFrom(this.categoryService.uploadImage(file));
  }

  edit(category: Category) {
    return lastValueFrom(this.categoryService.edit(category));
  }

  save() {
    this.busy = true;
    this.model = new Category();
    this.model.description = this.form.get("description")!.value!;
    this.model.avatar = this.fileName ?? "";
    this.model.userId = this.userId;
    this.model.status = this.form.get("status")!.value!;
    this.model.name = this.form.get("name")?.value!;
    this.model.id = this.form.get("id")?.value!;

    this.edit(this.model)
      .then(
        (result) => {
          if (this.model.avatar !== this.category.avatar) {
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

  populateData(arg: Category) {
    this.form.get("id")!.setValue(arg.id);
    this.form.get("name")?.setValue(arg.name);
    this.form.get("status")?.setValue(arg.status);
    this.form.get("description")?.setValue(arg.description);
    this.fileName = arg.avatar;
  }

  goBack() {
    this.location.back();
  }
}
