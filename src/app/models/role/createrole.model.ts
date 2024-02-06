import { Permission } from "./permission.model";

export class CreateRole {
  id!: string;
  role!: string;
  description?: string;
  createdOn?: string;
  companyId!: string;
  claims!: string[];
}
