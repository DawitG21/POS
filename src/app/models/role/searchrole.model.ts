import { Company } from ".././company/company.model";
import { Permission } from "./permission.model";
export class SearchRole {
  id!: string;
  role!: string;
  description?: string;
  createdOn?: string;
  companyId!: Company;
  claims!: string[];
  //permissions!: Permission[];
}
