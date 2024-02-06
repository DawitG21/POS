import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customFilterActivityLogs",
})
export class CustomFilterActivityLogsPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.action.toLowerCase().includes(searchTerm) ||
        item.actionOn.toLowerCase().includes(searchTerm) ||
        item.creator.name.toLowerCase().includes(searchTerm)
      );
    });
  }
}
