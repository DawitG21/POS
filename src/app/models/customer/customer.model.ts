import { Phone } from "../phone.model";
import { Address } from "../address.model";
import { Company } from "../company/company.model";
import { Creator } from "../creator.model";

export class Customer {
  phone!: Phone;
  address!: Address;
  id!: string;
  name!: string;
  email!: string;
  createdOn!: string;
  company!: Company;
  creator!: Creator;
  userId!: string;
  companyId!: string;
}
