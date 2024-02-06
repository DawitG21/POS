import { Phone } from '../phone.model';
import { Address } from '../address.model';
import { Company } from '../company/company.model';

export class Store {
    id!: string;
    name!: string;
    avatar!: string;
    phone!: Phone;
    address!: Address;
    status!: boolean;
    createdOn!: string;
    company!: Company;
    userId!: string;
}