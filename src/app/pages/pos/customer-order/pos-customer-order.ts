import { Component } from '@angular/core';
import { AppSettings } from '../../../service/app-settings.service';
import { CategoryService } from '../../category/category.service';
import { CategoryPagination } from '../../../models/category/category-pag.model';
import { Category } from '../../../models/category/category.model';
import { last, lastValueFrom } from 'rxjs';
import { ToastService } from '../../../service/toast.service';
import { MessageService } from '../../../service/message.service';
import { Product } from '../../../models/product/product.model';
import { Order } from "../../../models/pos_models/order.model";
import { ProductService } from '../../product/product.service';
import { AuthService } from '../../../service/auth.service';
import { RestaurantTable } from '../../../models/restaurant-table/restaurant-table.model';
import { CreateSales, SalesProduct } from "../../../models/sales/create_sales.model";
import { SalesService } from "../sales.service";
import { CustomerService } from '../../customer/customer.service';
import { Customer } from '../../../models/customer/customer.model';
import { Router } from '@angular/router';
import { StockService } from "../../stock.service";
import { Stock } from '../../../models/stock/stock.model';
import { StockProduct } from '../../../models/stock/stock.product';
import { Company } from '../../../models/company/company.model';
import { StorageService } from '../../../service/storage.service';
import { KeyService } from '../../../service/key.service';
import { SalesResponse } from '../../../models/sales/sales_response.model';

declare var bootstrap: any;

@Component({
	selector: 'pos-customer-order',
	templateUrl: './pos-customer-order.html',
	styleUrls: ['./pos-customer-order.css'],
})

export class PosCustomerOrderPage {
	menu: any = {};
	// order: any = {};
	order: Order[] = [];
	or!: Order;
	orderNo: any = '#0000';
	orderHistory: any = {};
	tableNo: any = '0';
	modal: any = '';
	modalData!: Product;
	modalDataProduct!: Product;
	modalQuantity: any = '';
	modalSelectedSize: any = '';
	modalSelectedAddon: any = [];
	mobileSidebarToggled: boolean = false;

	//category
	categories?: Category[];
	products?: Product[];
	busy: boolean = true;
	catImageUrl!: string;
	prodImageUrl!: string;
	waitorId!: string;
	restaurantTable!: RestaurantTable;
	companyId!: string;
	storeId!: string;
	model: CreateSales = new CreateSales();
	productsToSale: SalesProduct[] = [];
	productToSale!: SalesProduct;
	customers?: Customer[];
	selectedCustomerId: string = '';
	description: string = '';
	stocks?: Stock[];
	productStock?: StockProduct[] = [];
	filterProduct?: StockProduct[] = [];
	company?: Company;
	salesResponse?: any;
	showReceipt = false;
	currentDate = new Date();
	username = "";

	constructor(
		private appSettings: AppSettings,
		private categoryService: CategoryService,
		private toastService: ToastService,
		private messageService: MessageService,
		private productService: ProductService,
		private authService: AuthService,
		private salesService: SalesService,
		private customerService: CustomerService,
		private router: Router,
		private stockService: StockService,
		private storageService: StorageService,
		private keyService: KeyService,
	) {
	}

	ngOnInit() {
		this.appSettings.appHeaderNone = true;
		this.appSettings.appSidebarNone = true;
		this.appSettings.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
		this.appSettings.appContentFullHeight = true;
		//added by habex
		this.companyId = this.authService.getCompanyId;
		this.company = this.storageService.getData(this.keyService.COMPANYOBJECT_KEY);
		this.username = this.storageService.getData(this.keyService.USER_NAME_KEY);
		this.waitorId = this.authService.getWaitorId;
		this.restaurantTable = this.authService.getRestaurantTable;
		this.storeId = this.authService.getStoreId;

		this.catImageUrl = this.categoryService.getCategoryImage();
		this.prodImageUrl = this.productService.getProductImage();
		this.getCategoriesByCompany(this.companyId);
		// this.getProductByCompany(this.companyId);
		this.getStockByStoreId();
		this.getCustomerByCompany();


		// this.http.get<DataResponse>('assets/data/pos-customer-order/data.json', { responseType: 'json' }).subscribe((response: DataResponse) => {
		// 	this.menu = response;
		// 	// this.order = response.order;
		// 	this.orderNo = response.orderNo;
		// 	this.orderHistory = response.orderHistory;
		// 	this.tableNo = response.tableNo;
		// });
	}

	ngOnDestroy() {
		this.appSettings.appHeaderNone = false;
		this.appSettings.appSidebarNone = false;
		this.appSettings.appContentClass = '';
		this.appSettings.appContentFullHeight = false;
	}

	filterBasedOnCategory(categoryName: string) {
		if (this.stocks == null) {
			return;
		}
		this.busy = true;

		this.filterProduct = [];

		for (let product of this.stocks!) {
			product.products.map((sp) => this.filterProduct?.push(sp));
		}


		this.productStock = this.filterProduct?.
			filter((sp) => sp.categoryId.name === categoryName);

		this.busy = false;
	}

	getStockByStoreId() {
		this.busy = true;
		return lastValueFrom(this.stockService.getStock(1, 100))
			.then(
				(result) => {
					this.stocks = result.data;

					for (let product of this.stocks!) {
						product.products.map((sp) => this.productStock?.push(sp));
					}

				}, (reject) => {
					this.toastService.error(this.messageService.serverError);

				}
			).catch((error) => {
				this.toastService.error(this.messageService.serverError);

			}).finally(() => {
				this.busy = false;
			});
	}

	onCustomerSelected(event: any): void {

		this.selectedCustomerId = event.target.value;

	}

	// Inside your component class
	onDescriptionInput(event: Event): void {
		console.log(event);
		this.description = (event.target as HTMLInputElement).value;
	}


	getCustomerByCompany() {
		this.busy = true;
		return lastValueFrom(this.customerService.getCustomerByCompany(1, 50, this.companyId))
			.then((result) => {
				this.customers = result.data;
			}, (reject) => {
				this.toastService.error(this.messageService.serverError);

			}).catch((error) => {
				this.toastService.error(this.messageService.serverError);

			}).finally(() => {
				this.busy = false;
			})
	}

	getCategoriesByCompany(companyId: string) {
		this.busy = true;
		return lastValueFrom(this.categoryService.getCategoriesByCompany(1, 100, companyId)).then((result) => {
			this.categories = result.data;
		}, (reject) => {
			this.toastService.error(this.messageService.serverError);

		}).catch((error) => {
			this.toastService.error(this.messageService.serverError);

		}).finally(() => {
			this.busy = false;
		})
	}

	getProductByCompany(companyId: string) {
		this.busy = true;
		return lastValueFrom(this.productService.getProductsByCompany(1, 25, companyId)).then((result) => {
			this.products = result.data;
		}, (reject) => {
			this.toastService.error(this.messageService.serverError);

		}).catch((error) => {
			this.toastService.error(this.messageService.serverError);

		}).finally(() => {
			this.busy = false;
		})
	}

	showType(event: Event, type: string) {
		event.preventDefault();

		for (var i = 0; i < this.menu.category.length; i++) {
			if (this.menu.category[i].type == type) {
				this.menu.category[i].active = true;
			} else {
				this.menu.category[i].active = false;
			}
		}
		for (var i = 0; i < this.menu.food.length; i++) {
			if (this.menu.food[i].type == type || type == 'all') {
				this.menu.food[i].hide = false;
			} else {
				this.menu.food[i].hide = true;
			}
		}
	}

	showFoodModal(event: MouseEvent, food: Product, salesPrice: number, foodQuantity: number) {
		event.preventDefault();

		// for (let i = 0; i < this.menu.food.length; i++) {
		// 	if (this.menu.food[i].id == id) {
		// 		this.modalData = this.menu.food[i];
		// 	}
		// }
		this.modalDataProduct = new Product();
		this.modalDataProduct.id = food.id;
		this.modalDataProduct.avatar = food.avatar;
		this.modalDataProduct.category = food.category;
		this.modalDataProduct.categoryId = food.categoryId;
		this.modalDataProduct.code = food.code;
		this.modalDataProduct.company = food.company;
		this.modalDataProduct.createdBy = food.createdBy;
		this.modalDataProduct.createdOn = food.createdOn;
		this.modalDataProduct.name = food.name;
		this.modalDataProduct.userId = food.userId;
		this.modalDataProduct.unit = food.unit;
		this.modalDataProduct.quantityInStock = foodQuantity;
		this.modalDataProduct.description = food.description;
		this.modalDataProduct.salesPrice = salesPrice;

		this.modalData = this.modalDataProduct;


		// if (this.modalData.options && this.modalData.options.size) {
		// 	this.modalSelectedSize = this.modalData.options.size[0].text;
		// }

		this.modalQuantity = 1;
		// this.modalSelectedAddon = [];

		const modalPosItem = document.getElementById('modalPosItem');
		if (modalPosItem) {
			this.modal = new bootstrap.Modal(modalPosItem);
			this.modal.show();
		}
	}

	deductQty(event: MouseEvent, id: string) {
		event.preventDefault();
		if (this.order?.length! > 0) {

			for (var i = 0; i < this.order.length; i++) {
				if (this.order[i].id == id) {
					var newQty = this.order[i].quantity - 1;

					if (newQty < 1) {
						newQty = 1;
					}
					this.order[i].quantity = newQty;
				}
			}
		}
	}

	addQty(event: MouseEvent, id: string) {
		event.preventDefault();

		if (this.order?.length! > 0) {
			for (var i = 0; i < this.order.length; i++) {
				if (this.order[i].id == id) {
					if (this.order[i].quantity == this.modalDataProduct.quantityInStock) {
						this.toastService.error(`The quantity in stock is ${this.modalDataProduct.quantityInStock}`);
						return;
					}
					var newQty = this.order[i].quantity + 1;

					this.order[i].quantity = newQty;
				}
			}
		}

	}

	addToCart(event: MouseEvent) {
		event.preventDefault();

		this.modal.hide();
		//no where to select options
		// var options = [];
		// var extraPrice = 0;
		// if (this.modalSelectedSize) {
		// 	var option = {
		// 		"key": "size",
		// 		"value": this.modalSelectedSize
		// 	};
		// 	options.push(option);

		// 	if (this.modalData.options && this.modalData.options.size) {
		// 		for (var i = 0; i < this.modalData.options.size.length; i++) {
		// 			if (this.modalData.options.size[i].text == this.modalSelectedSize) {
		// 				extraPrice += parseFloat(this.modalData.options.size[i].price);
		// 			}
		// 		}
		// 	}
		// }
		//no where for addon
		// if (this.modalSelectedAddon) {
		// 	for (let addon in this.modalSelectedAddon) {
		// 		var option2 = {
		// 			"key": "addon",
		// 			"value": addon
		// 		};
		// 		options.push(option2);

		// 		if (this.modalData.options && this.modalData.options.addon) {
		// 			for (var i = 0; i < this.modalData.options.addon.length; i++) {
		// 				if (this.modalData.options.addon[i].text == addon) {
		// 					extraPrice += parseFloat(this.modalData.options.addon[i].price);
		// 				}
		// 			}
		// 		}
		// 	}
		// }

		// var finalPrice = parseFloat(this.modalData.price) + extraPrice;

		// this.order.push({
		// 	"id": (this.order.length + 1),
		// 	"image": this.modalData.image,
		// 	"title": this.modalData.title,
		// 	"price": finalPrice,
		// 	"quantity": this.modalQuantity,
		// 	"options": options
		// });



		this.or = new Order();
		this.or.id = (this.order.length + 1).toString();
		this.or.image = this.modalData.avatar;
		this.or.title = this.modalData.name;
		this.or.price = this.modalData.salesPrice.toString();
		this.or.quantity = this.modalQuantity;

		this.productToSale = new SalesProduct();
		this.productToSale.productId = this.modalData.id;
		this.productToSale.quantity = this.modalQuantity;

		this.order.push(this.or);
		this.productsToSale.push(this.productToSale);

	}

	addModalQty(event: MouseEvent) {
		event.preventDefault();

		if (this.modalQuantity == this.modalDataProduct.quantityInStock) {
			this.toastService.error(`The quantity in stock is ${this.modalDataProduct.quantityInStock}`);
			return;
		}
		this.modalQuantity = this.modalQuantity + 1;
	}

	deductModalQty(event: MouseEvent) {
		event.preventDefault();

		var newQty = parseInt(this.modalQuantity) - 1;

		if (newQty < 1) {
			newQty = 1;
		}
		this.modalQuantity = newQty;
	}

	toggleConfirmation(event: MouseEvent, id: string, value: boolean): void {
		event.preventDefault();

		for (let i = 0; i < this.order.length; i++) {
			if (this.order[i].id === id) {
				this.order[i].confirmation = value;
			}
		}
	}

	removeOrder(event: MouseEvent, id: string): void {
		event.preventDefault();

		if (this.order.length > 0) {

			for (let i = 0; i < this.order.length; i++) {
				if (this.order[i].id === id) {
					this.order.splice(i, 1);
				}
			}
		}
	}

	toggleMobileSidebar(): void {
		this.mobileSidebarToggled = !this.mobileSidebarToggled;
	}

	getOrderTotal(): number {
		return (this.order) ? this.order.length : 0;
	}

	getOrderHistoryTotal(): number {
		return (this.orderHistory) ? this.orderHistory.length : 0;
	}

	getSubTotalPrice(): string {
		let value = 0;
		for (let i = 0; i < this.order.length; i++) {
			value += parseFloat(this.order[i].price) * (this.order[i].quantity);
		}
		return value.toFixed(2);
	}

	getTaxesPrice(): string {
		let value = 0;
		for (let i = 0; i < this.order.length; i++) {
			// value += parseFloat(this.order[i].price) * (this.order[i].quantity) * 0.06;
			value += parseFloat(this.order[i].price) * (this.order[i].quantity) * 0.15;
		}
		return value.toFixed(2);
	}

	getTotalPrice(): string {
		let value = 0;
		for (let i = 0; i < this.order.length; i++) {
			value += parseFloat(this.order[i].price) * (this.order[i].quantity);
			value += parseFloat(this.order[i].price) * (this.order[i].quantity) * 0.15;
		}
		return value.toFixed(2);
	}

	createSale() {
		console.log(this.description);
		if (this.productsToSale.length < 1) {
			this.toastService.error('Select the products');
			return;
		}

		if (this.selectedCustomerId !== '') {
			console.log(this.selectedCustomerId)
			this.busy = true;
			const currentTimestamp: number = Date.now();
			const currentDate: Date = new Date(currentTimestamp);

			this.model.userId = this.waitorId;
			this.model.companyId = this.companyId;
			this.model.customerId = this.selectedCustomerId;
			// this.model.transType = "Sales";
			this.model.actionType = "credit";
			this.model.storeId = this.storeId;
			this.model.discount = 0.00;
			this.model.restaurantTable = this.restaurantTable.id;
			this.model.orderDate = currentDate.toISOString();
			this.model.description = this.description;
			// this.model.reference = "REF0347"; //optional
			this.model.products = this.productsToSale;

			console.log(this.model);

			this.sales(this.model);
		} else {
			this.toastService.error('Select the customer');
		}


	}

	goBack() {
		this.router.navigate(['/pos/select-user']);
	}

	sales(model: CreateSales) {
		return lastValueFrom(this.salesService.createOrder(model)).then(
			(result: any) => {
				this.salesResponse = result;
				this.showReceipt = true;
				console.log(this.salesResponse);
				this.toastService.success("Success");
				this.authService.deleteRestaurantTable();
				this.authService.deleteWaitorId();
				//this.goBack();
			}, (reject) => {
				this.toastService.error(this.messageService.serverError);
			}
		).catch((error) => {
			this.toastService.error(this.messageService.serverError);
		}).finally(() => {
			this.busy = false;
		})
	}



}
