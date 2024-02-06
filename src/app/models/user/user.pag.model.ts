import { SearchUser } from "./searchuser.model";

export class UserPagination {
    page!: number;
    pages!: number;
    pageSize!: number;
    rows!: number;
    data?: SearchUser[];
}