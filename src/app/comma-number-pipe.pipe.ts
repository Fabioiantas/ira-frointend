import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaNumberPipe'
})
export class CommaNumberPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
