import { Localization } from "../global/global.model";

export interface IUserRoles {
    id?:number;
    jobRoleName:Localization;
    creatorName?:string;
    roleUsers?:number;
    status:boolean;
    createdDate?:string;
    description:Localization;
    rolePowers:string[];
    restrictionLevelId?:string;
    schoolIds?:number[];
    curriculumIds?:number[];
   
}
