import { Company } from "../company/company.model";

export class ListOfUnits {
    name!: string;
    shortname!: string;
    baseUnit!: string;
    status!: boolean;
    createdOn!: string;
    _id!: string;
    id!: string;
    company!: Company
  
    constructor(data: any) {
      this.name = data.name || '';
      this.shortname = data.shortname || '';
      this.baseUnit = data.baseUnit || '';
      this.status = data.status || false;
      this.createdOn = data.createdOn || '';
      this._id = data._id || '';
      this.id = data.id || '';
      this.company = data.Company || '';
    }
  }
  