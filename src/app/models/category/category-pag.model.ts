import { Category } from "../category/category.model";
export class CategoryPagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: Category[];
}