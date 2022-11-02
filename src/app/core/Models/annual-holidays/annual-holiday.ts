

export interface IAnnualHoliday {
    id?:number;
    year?:string;
    annualCalendarName?:string;
    holidayList:IHoliday[];


  }

  export interface IHoliday {
    arabicName?:string;
    dateFrom?: string;
    dateTo?: string;
    flexibilityStatus?: string
    curriculumName?: ICurriculum[];
    id?:number;
    createdDate?:string;

  }

  export interface ICurriculum {
    id?:number;
    name?:string;

  }

