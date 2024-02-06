import { Company } from "../company/company.model";
import { SearchRole } from "../role/searchrole.model";
import { Store } from "../store/store.model";
export class SearchUser {
  id?: string;
  name!: string;
  avatar?: string;
  username!: string;
  role!: SearchRole;
  userTypeId!: string;
  store!: Store;
  company!: Company;
  password!: string;
  createdOn?: string;
  status!: boolean;
}
