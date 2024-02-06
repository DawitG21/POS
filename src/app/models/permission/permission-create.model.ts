import { Action } from "../action.model";

export class PermissionCreate {
  menu!: string;
  actions!: Action[];
  companyId!: string;
  userId!: string;
}
