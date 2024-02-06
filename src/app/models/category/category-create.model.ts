import { Address } from '../address.model';

export class CategoryCreate {
  id!: string;
  name!: string;
  avatar!: string;
  description!: string;
  status!: boolean;
  companyId!: string;
  createdOn!: string;
  userId!: string;
}