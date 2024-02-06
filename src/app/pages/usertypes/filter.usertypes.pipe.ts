// Inside your component or a shared utility file
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilterUserTypes',
})
export class CustomFilterUserTypePipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm)
      );
    });
  }
}
