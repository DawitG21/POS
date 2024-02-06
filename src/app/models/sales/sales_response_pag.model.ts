import { SalesResponse } from "./sales_response.model";

export class SalesResponsePagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: SalesResponse[];
}