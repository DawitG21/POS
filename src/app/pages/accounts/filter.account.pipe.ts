import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customFilterAccount",
})
export class CustomFilterAccountsPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.acname.toLowerCase().includes(searchTerm) ||
        item.acnumber.toString().toLowerCase().includes(searchTerm) ||
        item.actype.toLowerCase().includes(searchTerm) ||
        (item.status ? "active" : "inactive").includes(searchTerm)
      );
    });
  }
}
