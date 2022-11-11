import { Localization } from "../global/global.model";

export interface ISubject {
    id:number;
    subjectCode:string,
    subjectName:Localization,
    evaluationType:string,
    creatorName:string,
    editorName:string,
    createdDate:Date,
    lastEditedDate:Date,
    subjectMinmumDegree:number,
    subjectNameInReport:Localization,
    rateId:number,
    subjectMaxmumDegree:number,
    explanation:string,
    meaning:string,
    successStatus:string,
    isExemptableToLeave:boolean
}
