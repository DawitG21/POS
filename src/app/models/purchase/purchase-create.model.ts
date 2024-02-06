import { PurchaseProduct } from "./purchase-product.model";

export class PurchaseCreate {
  reference!: string;
  purchaseDate!: string;
  description!: string;
  discount!: number;
  storeId!: string;
  products!: PurchaseProduct[];
  transType!: string;
  actionType!: string;
  supplierId!: string;
  userId!: string;
  companyId!: string;
}
