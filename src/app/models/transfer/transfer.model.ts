import { Company } from '../company/company.model';
import { Store } from '../store/store.model';
import { TransferProduct } from './product-transfer.model';

export class Transfer {
  id!: string;
  company!: Company;
  storeTo!: Store;
  storeFrom!: Store;
  createdOn!: string;
  products!: TransferProduct[];
  userId!: string;
  tostoreId!: string;
  fromstoreId!: string;
  companyId!: string;
  productId!: string;
}