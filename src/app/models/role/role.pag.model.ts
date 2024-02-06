import { SearchRole } from './searchrole.model';

export class RolePagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: SearchRole[];
}