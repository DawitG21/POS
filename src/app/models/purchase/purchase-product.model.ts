import { Product } from "../product/product.model";

export class PurchaseProduct {
  productId!: Product;
  quantity!: number;
  rate!: number;
  salesPrice!: number;
  totalAmount!: number;
}
