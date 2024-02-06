import { Company } from "../company/company.model";

export class RestaurantTable {
  id!: string;
  name!: string;
  createdOn!: string;
  userId!: string;
  status!: number;
  company!: Company;
  companyId?: string;
}
