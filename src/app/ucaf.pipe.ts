import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucaf',
  standalone: true
})
export class UcafPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
