import { AdjustmentProduct } from "./adjustment-product.model";

export class AdjustmentCreate {
  description!: string;
  adjustmentDate!: string;
  createdBy!: string;
  storeId!: string;
  companyId!: string;
  products!: AdjustmentProduct[];
  quantity!: number;
  rate!: number;
  productId!: string;
  userId!: string;
}