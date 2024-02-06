export class Units {
  id?: string;
  name!: string;
  shortname!: string;
  baseUnit!: string;
  status!: boolean;
  companyId!: string;
  userId!: string;

  constructor(data: any) {
    this.name = data.name || "";
    this.shortname = data.shortname || "";
    this.baseUnit = data.baseUnit || "";
    this.status = data.status || true;

    this.companyId = data.companyId || "";
    this.userId = data.userId || "";
  }
}
