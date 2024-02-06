import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customFilterCategory",
})
export class CustomFilterCategoriesPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.status ? "active" : "inactive").includes(searchTerm)
      );
    });
  }
}
