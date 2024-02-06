export class Tax {
    name!: string;
    rate!: number;
    description!: string;
  
    constructor(name: string, rate: number, description: string) {
      this.name = name;
      this.rate = rate;
      this.description = description;
    }
  }
  