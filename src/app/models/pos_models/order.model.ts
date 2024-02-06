export class Order {
    id!: string;
    image?: string;
    title?: string;
    price!: string;
    // "options": [
    //     {
    //         "key": "size",
    //         "value": "large"
    //     }
    // ],
    quantity!: number;
    confirmation: boolean = false;
}