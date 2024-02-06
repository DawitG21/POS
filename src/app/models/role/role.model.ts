import { Company } from "../company/company.model";
import { Permission } from "../permission/permission.model";

export class Role {
  id!: string;
  role!: string;
  userId!: string;
  description!: string;
  companyId!: string;
  //permissions!: Permission[];
  claims!: string[];
  createdOn!: string;
  company!: Company;
}
