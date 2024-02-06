// vat.model.ts

export class ListOfTax {
    _id!: string;
    id!: string;
    name!: string;
    rate!: number;
    description!: string;
    status!: boolean;
    createdOn!: Date;
    createdBy!: string;
  
    constructor(data: any) {
      this._id = data._id;
      this.id = data.id;
      this.name = data.name;
      this.rate = data.rate;
      this.description = data.description;
      this.status = data.status;
      this.createdOn = new Date(data.createdOn);
      this.createdBy = data.createdBy;
    }
  }
  