import { Company } from "../company/company.model";
import { Creator } from "../creator.model";
import { Product } from "../product/product.model";
import { Store } from "../store/store.model";
import { Customer } from "../customer/customer.model";
import { Transaction } from "../transaction/transaction.model";
export class SalesResponse {

    _id!: string;
    products!: SProduct[];
    transactionId!: string;
    salesCode!: string;
    reference!: string;
    restaurantTable!: string;
    salesDate!: string;
    description!: string;
    amount!: number;
    tax!: number;
    discount!: number;
    totalAmount!: number;
    orderType!: string;
    orderStatus!: number;
    minutesTakenToStartPreparation!: number;
    actionType!: string;
    customerId!: string;
    storeId!: string;
    companyId!: string;
    createdBy!: string;
    createdOn!: string;
    transactions!: Transaction;
    customer!: Customer;
    store!: Store;
    company!: Company;
    creator!: Creator;
}


export class SProduct {
    productId!: string;
    name!: string;
    quantity!: number;
    salesPrice!: number;
    totalAmount!: number;
    image!: string;
    code!: string;
}