import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivityLogs } from "../../models/activity-logs.model";
import { firstValueFrom } from "rxjs";
import { SearchResult } from "../../interfaces/search-result";
import { Router } from "@angular/router";
import { MessageService } from "../../service/message.service";
import { ToastService } from "../../service/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivityLogsService } from "./activity-logs.service";

@Component({
  selector: "app-activity-logs",
  templateUrl: "./activity-logs.component.html",
  styleUrls: ["./activity-logs.component.css"],
})
export class ActivityLogsComponent {
  pages: number[] = [];
  page = 1;
  pageSize = 10;
  logs?: ActivityLogs[];
  busy: boolean = true;
  log!: ActivityLogs;
  searchActivityLogsTerm: string = "";
  startPage = 1;
  endPage = 10;

  @ViewChild("viewModal") viewModal: any;
  constructor(
    private activityLogsService: ActivityLogsService,
    public route: Router,
    private messageService: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.get();
  }

  setPageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;

    if (this.pageSize == 20) {
      this.page = Math.round(this.page / 2);

      if (this.page % 10 == 0) {
        this.startPage = this.page - 9;
        this.endPage = this.page;
      } else {
        this.startPage = this.page - (this.page % 10) + 1;
        this.endPage = this.startPage + 9;
      }

      if (this.endPage > this.pages.length / 2) {
        this.endPage = Math.round(this.pages.length / 2);
      } else {
        this.endPage = this.startPage + 9;
      }
    } else if (this.pageSize == 10) {
      this.page = this.page * 2 - 1;
      this.startPage = this.page - (this.page % 10) + 1;
      this.endPage = this.startPage + 9;

      if (this.endPage > this.pages.length * 2) {
        this.endPage = this.pages.length * 2;
      } else {
        this.endPage = this.startPage + 9;
      }
    }
    this.get();
  }

  setPageRangeSubtract(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      if (page === 1) {
        this.startPage = this.page;
        this.endPage = this.startPage + 9;
      } else {
        if (this.endPage === this.pages.length) {
          this.endPage = this.endPage - (this.endPage % 10);
          this.startPage = this.endPage - 9;
        } else {
          this.startPage -= 10;
          this.endPage -= 10;
        }
      }
      this.get();
    }
  }

  setPageRangeAdd(page: number) {
    if (page >= 1 && page < this.pages.length) {
      this.page = page + 10;
      if (this.page >= this.pages.length) {
        page = this.pages.length;
        this.page = this.pages.length;
        this.endPage = this.pages.length;
        if (this.endPage % 10 === 0) this.startPage = this.endPage - 9;
        else this.startPage = this.pages.length - (this.pages.length % 10) + 1;
      } else {
        this.startPage += 10;
        this.endPage += 10;
        if (this.endPage > this.pages.length) this.endPage = this.pages.length;
      }
      this.get();
    }
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.page = page;
      this.get();
    }
  }

  public getLogs(): Promise<any> {
    return firstValueFrom(
      this.activityLogsService.getActivityLog(this.page, this.pageSize)
    );
  }

  get(): void {
    this.busy = true;
    this.getLogs()
      .then(
        (result: SearchResult) => {
          if (this.logs?.length === 0) {
            this.logs = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          } else {
            this.logs = [];
            this.logs = result.data;
            this.pages = Array.from(
              { length: result.pages },
              (_, index) => index + 1
            );
          }
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

  view(log: ActivityLogs) {
    this.log = log;
    this.modalService
      .open(this.viewModal, { ariaLabelledBy: "viewModalLabel" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  formatDateToCustomFormat(dateString: string): string {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
}
