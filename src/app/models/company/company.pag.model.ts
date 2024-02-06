import { Company } from "./company.model";

export class CompanyPagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: Company[];

    constructor(page: number, pages: number, pageSize: number, rows: number) {
        this.page = page;
        this.pages = pages;
        this.pageSize = pageSize;
        this.rows = rows;
    }

}