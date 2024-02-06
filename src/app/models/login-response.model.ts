import { Auth } from "./auth.model";
import { Company } from "./company/company.model";
import { CreateRole } from "./role/createrole.model";
import { Store } from "./store/store.model";
import { UserType } from "./usertypes/usertype.model";

export class LoginResponse {
    id!: string;
    name!: string;
    status!: string;
    avatar!: string;
    username!: string;
    role: CreateRole;
    company: Company;
    authorization: Auth;
    store!: Store;
    claims!: any[];
    userType!: UserType;

    constructor() {
        this.role = new CreateRole();
        this.company = new Company();
        this.authorization =  new Auth();
    }
}