// vat.model.ts

export class TaxModel {
    name!: string;
    rate!: number;
    description!: string;
    userId!: string;
  
    constructor(data: any) {
      this.name = data.name || '';
      this.rate = data.rate || '';
      this.description = data.description || '';
      this.userId = data.userId || '';
    }
  }
  