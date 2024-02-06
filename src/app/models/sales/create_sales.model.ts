export class CreateSales {
    reference!: string; // I reatined this ref
    restaurantTable!: string; // I added this
    orderDate!: string; // dateTime
    description!: string;
    discount!: number;
    storeId!: string;
    products!: SalesProduct[];
    transType!: string; //sales
    actionType!: string; // credit or debit
    customerId!: string; // WALK-IN CUSTOMER ID
    companyId!: string;
    userId!: string;
}


export class SalesProduct {
    productId!: string;
    quantity!: number;
}