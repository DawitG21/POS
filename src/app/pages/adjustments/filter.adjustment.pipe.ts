// Inside your component or a shared utility file
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilterAdjustment',
})
export class CustomFilterAdjustmentsPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.description.toLowerCase().includes(searchTerm) ||
        //item.createdOn.toString().toLowerCase().includes(searchTerm) ||
        item.tranType.toLowerCase().includes(searchTerm) ||
        item.adjustmentDate.toLowerCase().includes(searchTerm) ||
        item.store.name.toLowerCase().includes(searchTerm) ||
        item.totalAmount.toString().toLowerCase().includes(searchTerm) ||
        item.transactionId.toLowerCase().includes(searchTerm)
      );
    });
  }
}
