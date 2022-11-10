import { StatusEnum } from "src/app/shared/enums/status/status.enum";

export interface ISurvey {
  id:number;
  surveyNumber:string;
  arabicTitle:string;
  englishTitle:string;

  surveyType:string;
  userName:string;
  arabicUserName:string;
  createdDate:string;
  surveyStatus:StatusEnum;

  targetGuardians:number;


}
