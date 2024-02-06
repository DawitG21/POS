import { Phone } from '../phone.model';
import { Address } from '../address.model';

export class StoreCreate {
    name!: string;
    avatar!: string;
    phone!: Phone;
    address!: Address;
    userId!: string;
    companyId!: string;
    status!: boolean;
}