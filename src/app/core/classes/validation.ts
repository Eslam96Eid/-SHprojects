import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { addHours, startOfDay } from "date-fns";

export function	matchValues(matchTo: string ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value !== control.parent.controls[matchTo].value
        ? { isMatching: true }
        : null;
    };
  }


  export const DateValidator: ValidatorFn = (control: AbstractControl<any, any>): null | { [key: string]: boolean } => {

    const Year = control.get('year');
    const valYear = Year.value as string;
    var yearTo = "";
    var yearFrom = "";
    const holidayarr = control.get('holiday').value;
    var DateFrom: string = "";
    var DateTo: string = "";
  
    holidayarr.forEach(element => {
      DateFrom = Object.values(element)[3] as string;
      DateTo = Object.values(element)[4] as string;
  
      if (DateFrom != "" && DateTo != "") {
        yearTo = DateTo.toString().substring(11, 15);
        yearFrom = DateFrom.toString().substring(11, 15);
  
        if (yearFrom != valYear && yearTo != valYear) {
  
        }
  
      }
  
    });
  
    return (valYear == yearFrom && valYear == yearTo) ? null : { yearmatch: true };
  
  };

  export class DateValidators {

    static greaterThan(startDate:string , endDate:string): ValidatorFn{

      return (formGroup: AbstractControl): ValidationErrors | null =>{

        const startDateCtr = formGroup.get(startDate)
        const endDateCtr = formGroup.get(endDate)

        this.resetSeconds(formGroup.get(startDate).value)
        this.resetSeconds(formGroup.get(endDate).value)

        if(!endDateCtr.value || !startDateCtr.value) return null
        console.log(startDateCtr.value, endDateCtr.value);

        if(endDateCtr.errors && !endDateCtr.errors['not']) return null;
        
        if(endDateCtr.value <= startDateCtr.value) endDateCtr.setErrors({not: true})
        
        return  null
        
      }
    }


    static dateRange(startDate:string , endDate:string) : ValidatorFn{
      const DAY_START= addHours(startOfDay(new Date()), 8)
      const DAY_END = addHours(startOfDay(new Date()), 14)
      
      return (formGroup: AbstractControl): ValidationErrors | null =>{

        const startDateCtr = formGroup.get(startDate)
        const endDateCtr = formGroup.get(endDate)
        
        this.resetSeconds(formGroup.get(startDate).value)
        this.resetSeconds(formGroup.get(endDate).value)

        if(!endDateCtr.value && !startDateCtr.value) return null

        if(startDateCtr.errors && !startDateCtr.errors['outRang']) return null;
        if(endDateCtr.errors && !endDateCtr.errors['outRang']) return null;
        
        if(startDateCtr.value < DAY_START) startDateCtr.setErrors({outRang: true})
        if(endDateCtr.value > DAY_END) endDateCtr.setErrors({outRang: true})
        console.log(DAY_END> endDateCtr.value);
        
        
        return  null
        
      }
    }

    static resetSeconds(date:Date){
      if(date) date.setSeconds(0);
    }


  }