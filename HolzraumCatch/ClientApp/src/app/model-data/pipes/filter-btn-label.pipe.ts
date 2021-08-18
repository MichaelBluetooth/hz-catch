import { Pipe, PipeTransform } from "@angular/core";
import { FilterOption } from "../models/filter-option";

@Pipe({
  name: "filterBtnLabel",
  pure: false
})
export class FilterBtnLabelPipe implements PipeTransform {
  transform(options: FilterOption[], label: string): string {
    const selected = options.filter(opt => opt.selected).map(opt => opt.value);
    if (selected.length > 0) {
      return `${label}: ${selected.join(', ')}`
    } else {
      return label;
    }
  }
}
