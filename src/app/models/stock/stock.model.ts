import { StockProduct } from "./stock.product";

export class Stock {
    id!: string;
    products!: StockProduct[];
    createdOn!: string;
    company!: string;
    store!: string;
    creator!: string;
}