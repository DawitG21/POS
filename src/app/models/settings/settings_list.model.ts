export class SettingsList {
    cashonhand!: number;
    cogs!: number;
    discount!: number;
    vat!: number;
    accountsreceivable!: number;
    salesrevenue!: number;
    accountspayable!: number;
    companyId!: string;
    userId!:string;
    _id!: string;
    id!: string;
  
    constructor(data: any) {
      this.cashonhand = data.cashonhand || '';
      this.cogs = data.cogs || '';
      this.discount = data.discount || '';
      this.vat = data.vat || '';
      this.accountsreceivable = data.accountsreceivable || '';
      this.salesrevenue = data.salesrevenue || '';
      this.accountspayable = data.accountspayable || '';
      this.companyId = data.companyId || '';
      this.userId = data.companyId || '';

      this._id = data._id || '';
      this.id = data.id || '';
    }
  }
  