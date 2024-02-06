import { Phone } from "../phone.model";
import { Address } from "../address.model";
import { Company } from "../company/company.model";
import { Creator } from "../creator.model";

export class Supplier {
  phone!: Phone;
  address!: Address;
  id!: string;
  name!: string;
  status!: boolean;
  createdOn!: string;
  creator!: Creator;
  company!: Company;
  userId!: string;
}
