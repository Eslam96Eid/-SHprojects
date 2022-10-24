import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date): unknown {
    var p=value.getFullYear;
    var p1=value.getMonth;
    var p3=value.getDate;
    // return super.transform(value, "EEEE d MMMM y h:mm a");
    return p3+"/"+p1+"/"+p3;
  }

}
