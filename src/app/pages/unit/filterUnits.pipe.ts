import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterUnits",
})
export class FilterUnitsPipe implements PipeTransform {
  transform(units: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return units;
    }

    searchTerm = searchTerm.toLowerCase();
    return units.filter(
      (unit) =>
        unit.name.toLowerCase().includes(searchTerm) ||
        unit.shortname.toLowerCase().includes(searchTerm) ||
        unit.baseUnit.toLowerCase().includes(searchTerm)
    );
  }
}
