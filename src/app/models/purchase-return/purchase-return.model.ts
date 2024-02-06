import { Company } from "../company/company.model";
import { Creator } from "../creator.model";

import { Transaction } from "../transaction/transaction.model";
import { Supplier } from "../supplier/supllier.model";
import { Store } from "../store/store.model";
import { PurchaseProduct } from "../purchase/purchase-product.model";

export class PurchaseReturn {
  id!: string;
  userId!: string;
  transactionId!: string;
  purchaseReturnCode!: string;
  reference!: string;
  puchaseReturnDate!: string;
  description!: string;
  amount!: number;
  discount!: number;
  tax!: number;
  totalAmount!: number;
  actionType!: string;
  products!: PurchaseProduct[];
  supplierId!: string;
  storeId!: string;
  companyId!: string;
  createdBy!: string;
  createdOn!: string;
  transactions!: Transaction[];
  supplier!: Supplier;
  store!: Store;
  company!: Company;
  creator!: Creator;
}
