import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../service/app-settings.service';
import { SalesService } from '../sales.service';
import { lastValueFrom } from 'rxjs';
import { MessageService } from '../../../service/message.service';
import { ToastService } from '../../../service/toast.service';
import { SalesResponse } from '../../../models/sales/sales_response.model';
import { RestaurantTableService } from '../../restaurant-table/restaurant-table.service';
import { KitchenOrder, KitchenOrderProduct } from "../../../models/pos_models/kitchen_Order.model";
import { ProductService } from '../../product/product.service';
import { Create } from '../../../models/create.model';
import { AuthService } from '../../../service/auth.service';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: string;
}

@Component({
  selector: 'pos-kitchen-order',
  templateUrl: './pos-kitchen-order.html'
})

export class PosKitchenOrderPage {

  order: any;
  salesOrder?: SalesResponse[];
  kitchenOrder?: KitchenOrder[] = [];
  ko!: KitchenOrder;
  kop!: KitchenOrderProduct;
  prodImageUrl!: string;
  busy: boolean = true;
  orderType: string = 'Offline';
  orderStatus: string = '';
  create: Create = new Create();
  userId!: string;
  from: string = "0";
  to: string = "0";


  constructor(
    private appSettings: AppSettings,
    private http: HttpClient,
    private salesService: SalesService,
    private toastService: ToastService,
    private messageService: MessageService,
    private restaurantTableService: RestaurantTableService,
    private productService: ProductService,
    private authService: AuthService,
  ) { }



  ontoDateSelected(event: any): void {
    // 'event.target.value' contains the selected date in the format 'yyyy-mm-dd'
    this.to = event.target.value;
    this.getOrdersByCompany();

    // You can perform further actions with the selected date
  }

  onfromDateSelected(event: any): void {
    // 'event.target.value' contains the selected date in the format 'yyyy-mm-dd'
   this.from = event.target.value;
    this.getOrdersByCompany();
    // You can perform further actions with the selected date
    // console.log('Selected Date:', selectedDate);
  }

  startOrder(orderId: string) {
    this.busy = true;
    this.create.createdBy = this.userId;
    return lastValueFrom(this.salesService.startOrder(orderId, this.create))
      .then((result) => {
        //        this.getOrderByCompanyFilter();
        this.getOrdersByCompany();

      }, (reject) => {
        this.toastService.error(this.messageService.serverError);

      }).catch((error) => {
        this.toastService.error(this.messageService.serverError);

      }).finally(() => {
        this.busy = false;
      });
  }


  completeOrder(orderId: string) {

    this.busy = true;
    this.create.createdBy = this.userId;
    return lastValueFrom(this.salesService.completeOrder(orderId, this.create))
      .then((result) => {
        //this.getOrderByCompanyFilter();
        this.getOrdersByCompany();

      }, (reject) => {
        this.toastService.error(this.messageService.serverError);

      }).catch((error) => {
        this.toastService.error(this.messageService.serverError);

      }).finally(() => {
        this.busy = false;
      });
  }

  CancelOrder(orderId: string) {
    this.busy = true;
    this.create.createdBy = this.userId;
    return lastValueFrom(this.salesService.cancelOrder(orderId, this.create))
      .then((result) => {
        // this.getOrderByCompanyFilter();
        this.getOrdersByCompany();

      }, (reject) => {
        this.toastService.error(this.messageService.serverError);

      }).catch((error) => {
        this.toastService.error(this.messageService.serverError);

      }).finally(() => {
        this.busy = false;
      });
  }


  checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var a;
    m = this.checkTime(m);
    s = this.checkTime(s);
    a = (h > 11) ? 'pm' : 'am';
    h = (h > 12) ? h - 12 : h;

    setTimeout(() => this.getTime(), 500);

    return h + ":" + m + a;
  }

  getTotalCompletedItems(items: any) {
    var count = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].status == 'Completed') {
        count++;
      }
    }
    return count;
  }

  setItemStatus(event: MouseEvent, item: any, status: any) {
    event.preventDefault();

    if (confirm('Confirm set this order to ' + status + '?') === true) {
      item.status = status;
    }
  }

  onOrderTypeFilter(event: any) {
    this.orderType = event.target.value;
    this.getOrderByCompanyFilter();
  }
  onOrderStatusFilter(event: any) {
    this.orderStatus = event.target.value;
    this.getOrderByCompanyFilter();

  }

  getOrderByCompanyFilter() {
    this.busy = true;
    return lastValueFrom(
      this.salesService.getOrderByCompanyFilter(1, 100, this.orderType, this.orderStatus)
    ).then(
      (result) => {

        if (result.data?.length! > 0) {
          // Get today's date in the format "YYYY-MM-DD"

          // const todayDate = new Date().toISOString().split("T")[0];
          // // Filter the objects based on today's date
          // const filteredData = result.data!.filter(item => {
          //   const itemDate = new Date(item.salesDate).toISOString().split("T")[0];
          //   return itemDate === todayDate;
          // });

          // this.salesOrder = filteredData;
          this.salesOrder = result.data;
          this.kitchenOrder = [];


          console.log(`SalesOrder${this.salesOrder}`);
          this.populateKitchenOrder();
        } else {
          this.salesOrder = [];
        }


      }, (reject) => {
        // this.toastService.error(this.messageService.serverError);
        this.kitchenOrder = [];

      }
    ).catch((error) => {
      this.toastService.error(this.messageService.serverError);

    }).finally(() => {
      this.busy = false;
    });

  }

  getOrdersByCompany() {
    this.busy = true;
    return lastValueFrom(
      this.salesService.getOrderByCompany(1, 100, this.from, this.to)
    ).then(
      (result) => {
        if (result.data?.length! > 0) {
          // Get today's date in the format "YYYY-MM-DD"

          // const todayDate = new Date().toISOString().split("T")[0];
          // // Filter the objects based on today's date
          // const filteredData = result.data!.filter(item => {
          //   const itemDate = new Date(item.salesDate).toISOString().split("T")[0];
          //   return itemDate === todayDate;
          // });

          // this.salesOrder = filteredData;
          this.salesOrder = result.data;
          this.kitchenOrder = [];

          this.populateKitchenOrder();
        } else {
          this.salesOrder = [];
        }


      }, (reject) => {
        // this.toastService.error(this.messageService.serverError);

      }
    ).catch((error) => {
      this.toastService.error(this.messageService.serverError);

    }).finally(() => {
      this.busy = false;
    });
  }

  populateKitchenOrder() {

    if (this.salesOrder?.length! > 0) {
      for (let sales of this.salesOrder!) {
        this.ko = new KitchenOrder();
        this.ko.tableNo = sales.restaurantTable;
        this.ko.orderNo = sales.salesCode;
        this.ko.orderType = sales.orderType;
        this.ko.orderTime = sales.salesDate;
        if (sales.orderStatus === 3) {
          this.ko.orderStatus = 'Completed';
        }
        if (sales.orderStatus === 2) {
          this.ko.orderStatus = 'Cancelled';
        }

        //this.ko.orderStatus = sales.orderStatus === 3 ? 'Completed' : 'not';
        this.ko.status = sales.orderStatus;
        this.ko.orderId = sales._id;
        // this.ko.status = sales.orderStatus;
        this.ko.totalOrderTime = sales.minutesTakenToStartPreparation.toString();
        for (let sp of sales.products) {
          this.kop = new KitchenOrderProduct();
          // this.kop.image = sp.productId.avatar;
          this.kop.image = sp.image;
          this.kop.title = sp.name;
          this.kop.quantity = sp.quantity.toString();
          if (sales.orderStatus === 3) {

            this.kop.status = 'Completed';
          }
          if (sales.orderStatus === 2) {
            this.kop.status = 'Cancelled';

          }
          this.ko.items?.push(this.kop);
        }
        this.kitchenOrder?.push(this.ko);
      }
    }

    console.log(`KitchenOrder${JSON.stringify(this.kitchenOrder)}`);
  }


  //add restaurantTable to model

  getRestaurantTableById(id: string) {
    return lastValueFrom(
      this.restaurantTableService.getRestaurantTablesByTableId(id)
    ).then(
      (result) => {
      }, (reject) => {
        this.toastService.error(this.messageService.serverError);

      }
    ).catch((error) => {
      this.toastService.error(this.messageService.serverError);

    }).finally(() => {

    })
  }


  formatTime(timestamp: string) {
    // const timestamp = "2024-01-22T14:28:22.208Z";
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options);
  }


  ngOnInit() {
    this.appSettings.appHeaderNone = true;
    this.appSettings.appSidebarNone = true;
    this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
    this.appSettings.appContentFullHeight = true;
    this.userId = this.authService.getUserId;
    this.prodImageUrl = this.productService.getProductImage();
    this.getOrdersByCompany();

    this.http.get('assets/data/pos-kitchen-order/data.json',
      { responseType: 'json' }).subscribe((response) => {
        this.order = response;
      });
  }

  ngOnDestroy() {
    this.appSettings.appHeaderNone = false;
    this.appSettings.appSidebarNone = false;
    this.appSettings.appContentClass = '';
    this.appSettings.appContentFullHeight = false;
  }
}
