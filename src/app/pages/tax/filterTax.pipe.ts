// Inside your component or a shared utility file
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilterTaxs',
})
export class CustomFilterTaxsPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.rate.toString().toLowerCase().includes(searchTerm) ||
        item.createdOn.toString().toLowerCase().includes(searchTerm) ||
        (item.status ? 'active' : 'inactive').includes(searchTerm)
      );
    });
  }
}
