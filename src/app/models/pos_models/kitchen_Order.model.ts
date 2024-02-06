export class KitchenOrder {
    tableNo!: string;// 14,
    orderNo!: string;// 9047,
    orderType!: string;// Dine-in,
    orderTime!: string;// 12:13,
    orderStatus!: string;// Completed,
    totalOrderTime!: string;// 12:30,
    urgent?: boolean;// 
    status!: number;
    orderId!: string;

    items: KitchenOrderProduct[] = [];

}
export class KitchenOrderProduct {
    image!: string;
    title!: string;
    status!: string;
    quantity!: string;
    note!: string[];
}