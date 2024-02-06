import { Phone } from "../phone.model";
import { Address } from "../address.model";

export class Company {
    id?: string;
    name!: string;
    tinnumber!: string;
    email!:string;
    phone?: Phone;
    address?: Address;
    avatar!: string;
    status?: boolean;
    code?: string;
    createdOn?: string;
}