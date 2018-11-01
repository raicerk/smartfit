import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SecondtominutesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'secondtominutes',
})
export class SecondtominutesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return(value-(value%=60))/60+(9<value?':':':0')+value
  }
}
