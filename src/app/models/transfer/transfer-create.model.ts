import { TransferProduct } from './product-transfer.model';
export class TransferCreate {
  tostoreId!: string;
  fromstoreId!: string;
  companyId!: string;
  userId!: string;
  products!: TransferProduct[];
}