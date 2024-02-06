import { Company } from '../company/company.model';
import { Store } from '../store/store.model';
import { Product } from '../product/product.model';
import { Creator } from '../creator.model';
import { AdjustmentProduct } from './adjustment-product.model';

export class Adjustments {
  id!: string;
  totalAmount!: number;
  description!: string;
  adjustmentDate!: string;
  createdOn!: string;
  transactionId!: string;
  tranType!: string;
  products!: AdjustmentProduct[];
  storeId!: string;
  store!: Store;
  companyId!: string;
  userId!: string;
  company!: Company;
  createdBy!: string;
  creator!: Creator;

}