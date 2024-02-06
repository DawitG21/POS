import { Company } from "../company/company.model";
import { Creator } from "../creator.model";
import { Action } from "../action.model";

export class Permission {
  id!: string;
  _id!: string;
  // userId!: string;
  // menu!: string;
  // actions!: Action[];
  // createdBy!: string;
  // companyId!: string;
  // createdOn!: string;
  // company!: Company;
  // creator!: Creator;
  module!: string;
  //claims!: Claims[];
  claims!: string[];
}
