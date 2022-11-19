import { StatusEnum } from "src/app/shared/enums/status/status.enum"

export interface Filter{
    KeyWord:string
    SortBy: string,
    Page: number,
    PageSize: number,
    SortColumn: string,
    SortDirection: string

    // schools
    Status?:StatusEnum |boolean
    City?:string
    curricuulumId?: string
    StateId?:string
    jobtitelid?:number

    // students
    SchoolId?:string;
    GradeId?:string;
    DivisionId?:string;
    TrackId?:string;
    NationalityId?:string;
    IsPassed?:string;
    IsChildOfAMartyr?:boolean;
    TalentId?:boolean;
    // withDisabilities?:boolean
    IsInFusionClass?:boolean,
    IsSpecialClass?:boolean
    roleId?:string;
    //Holiday
    Year?:string;
    CurriculumName?:string;
    HolidayStatus?:string;

    //Users
    UserStatus?:string;
    UserRole?:string


      //Assessment
      status?:boolean |StatusEnum
      isactive?:boolean

      //survey
      SurveyType?:string;
      SurveyStatus?:string;

  }


