import { Product } from "../product/product.model";
export class ProductPagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: Product[];
}