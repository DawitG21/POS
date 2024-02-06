import { Phone } from "../phone.model";
import { Address } from "../address.model";

export class CustomerCreate {
  name!: string;
  email!: string;
  phone!: Phone;
  address!: Address;
  companyId!: string;
  userId!: string;
}
