export class Settings {
    cashonhand!: number;
    cogs!: string;
    discount!: number;
    vat!: number;
    accountsreceivable!: number;
    accountspayable!: number;
    salesrevenue!: number;
    companyId!: string;
    userId!:string;

  
    constructor(data: any) {
      this.cashonhand = data.cashonhand || '';
      this.cogs = data.cogs || '';
      this.discount = data.discount || '';
      this.vat = data.vat || '';
      this.accountsreceivable = data.accountsreceivable || '';
      this.accountspayable = data.accountspayable || '';
      this.salesrevenue = data.salesrevenue || '';
      this.companyId = data.companyId || '';
      this.userId = data.userId || '';

    }
  }
  