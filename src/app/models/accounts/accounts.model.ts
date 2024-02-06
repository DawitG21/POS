export class Accounts {
    accountname!: string;
    accountnumber!: string;
    accounttype!: string;
    userId!: string;
    companyId!: string;
    status!: boolean;
  
    constructor(data: any) {
      this.accountname = data.accountname || '';
      this.accountnumber = data.accountnumber || '';
      this.accounttype = data.accounttype || '';
      this.userId = data.userId || '';
      this.companyId = data.companyId || '';
      
      this.status = data.status || true;
    }
  }
  