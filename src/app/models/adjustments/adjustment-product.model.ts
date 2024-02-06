import { Product } from "../product/product.model";

export class AdjustmentProduct {
  id!: string;
  name!: string;
  code!: string;
  quantity!: number;
  rate!: number;
  amount!: number;
}
