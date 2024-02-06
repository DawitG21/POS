import { Category } from "../category/category.model";
import { Product } from "../product/product.model";
export class StockProduct {
    id!: string;
    quantity!: number;
    price!: number;
    salesPrice!: number;
    productId!: Product;
    categoryId!: Category;
}