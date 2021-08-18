import { Pipe, PipeTransform } from '@angular/core';
import { SummaryData } from 'src/app/core/models/summary-data';

@Pipe({
  name: 'countSummary'
})
export class CountSummaryPipe implements PipeTransform {
  transform(data: SummaryData[]): number {
    let count = 0;
    data?.forEach(d => {
      count += d.count;
    });
    return count;
  }
}
