import { Company } from "../company/company.model";
import { Creator } from "../creator.model";
import { Units } from "../units/units.model";
import { Category } from "../category/category.model";

export class Product {
  id!: string;
  _id!: string;
  code!: string;
  name!: string;
  avatar!: string;
  description!: string;
  quantityInStock!: number;
  amountInStock?: number;
  salesPrice!: number;
  unitId!: string;
  companyId!: string;
  categoryId!: string;
  createdBy!: string;
  createdOn!: string;
  userId!: string;
  unit!: Units;
  company!: Company;
  category!: Category;
  creator!: Creator;
}
