import { Address } from '../address.model'
import { Company } from '../company/company.model'
import { Creator } from '../creator.model';

export class Category{
  id!: string;
  name!: string;
  avatar!: string;
  description!: string;
  status!: boolean;
  createdOn!: string;
  company!: Company;
  creator?: Creator;
  userId!: string;
}