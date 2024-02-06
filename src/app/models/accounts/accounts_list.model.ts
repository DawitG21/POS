import { Company } from "../company/company.model";
import { Creator } from "../creator.model";

export class ListOfAccounts {
  acname!: string;
  acnumber!: string;
  actype!: string;
  status!: boolean;
  createdOn!: string;
  _id!: string;
  id!: string;
  companyId?: string;
  creator!: Creator;
  company!: Company;

  constructor(data: any) {
    // Initialize properties based on data
    this.acname = data.acname;
    this.acnumber = data.acnumber;
    this.actype = data.actype;
    this.status = data.status;
    this.createdOn = data.createdOn;
    this._id = data._id;
    this.id = data.id;
  }
}
