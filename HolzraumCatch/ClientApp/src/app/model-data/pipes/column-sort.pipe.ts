import { Pipe, PipeTransform } from "@angular/core";
import { ModelDataProperty } from "src/app/core/models/model-data-property";

@Pipe({
  name: "columnSort",
})
export class ColumnSortPipe implements PipeTransform {
  transform(props: ModelDataProperty[]): unknown {
    return props.sort((p1, p2) => {
      if (p1.visible && !p2.visible) {
        return -1;
      } else if (!p1.visible && p2.visible) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
