export interface ISchoolYear {
    id:number;
    schoolYearName:string;
    curriculum: string;
    schoolYearStartDate:string;
    schoolYearEndDate:string;
    weekendDays:string[];
    createdDate:string;
    class:string;
    annualHolidayName:string;
    ageDeterminationDate:string;
    activateAge:string;
    ageRequirementToRegisterFromInsideCountry:string;
    ageRequirementToRegisterFromOutsideCountry:string;
    knownSubjectList:string;
    subjectStatus:string;
    subjectStatusInFinalTotal:string;
    
}
