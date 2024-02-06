import { PurchaseProduct } from "../purchase/purchase-product.model";

export class PurchaseReturnCreate {
  reference!: string;
  puchaseReturnDate!: string;
  description!: string;
  discount!: number;
  storeId!: string;
  products!: PurchaseProduct[];
  transType!: string;
  actionType!: string;
  supplierId!: string;
  companyId!: string;
  userId!: string;
}
