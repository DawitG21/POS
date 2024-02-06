import { Stock } from "./stock.model";

export class StockPagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: Stock[];
}