// Inside your component or a shared utility file
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilterTransfer',
})
export class CustomFilterTransfersPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.product.name.toLowerCase().includes(searchTerm) ||
        item.storeFrom.name.toLowerCase().includes(searchTerm) ||
        item.storeTo.name.toLowerCase().includes(searchTerm) ||
        item.quantity.toString().toLowerCase().includes(searchTerm)
      );
    });
  }
}
