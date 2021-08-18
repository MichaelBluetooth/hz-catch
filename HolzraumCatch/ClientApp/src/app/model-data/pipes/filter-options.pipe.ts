import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { FilterOption } from "../models/filter-option";

@Pipe({
  name: "filterOptions",
})
@Injectable({
  providedIn: "root",
})
export class FilterOptionsPipe implements PipeTransform {
  transform(data: any[], fieldName: string): FilterOption[] {
    return data
      .map((d) => d[fieldName])
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((opt) => {
        return { value: opt, selected: false };
      });
  }
}
