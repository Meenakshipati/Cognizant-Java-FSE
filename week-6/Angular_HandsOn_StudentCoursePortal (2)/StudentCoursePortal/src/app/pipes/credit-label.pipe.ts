import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true,
  // Pure by default: only re-runs when the input reference changes.
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    if (credits === null || credits === undefined || credits === 0) {
      return 'No Credits';
    }
    return credits === 1 ? '1 Credit' : `${credits} Credits`;
  }
}
