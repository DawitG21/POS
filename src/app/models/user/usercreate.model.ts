export class CreateUser {
  id?: string;
  name!: string;
  avatar?: string;
  username!: string;
  roleId!: string;
  storeId!: string;
  userTypeId!: string;
  companyId!: string;
  password!: string;
  createdOn?: string;
  updatedOn?: string;
  status!: boolean;
}
