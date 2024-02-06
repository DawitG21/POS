export class Address {
    city!: string;
    country!: string;


    constructor(city: string, country: string) {
        this.city = city;
        this.country = country;
    }
}