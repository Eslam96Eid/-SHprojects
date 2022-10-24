import { CitiesEnum } from "src/app/shared/enums/cities/city.enum";
import { InstitutionEnum } from "src/app/shared/enums/institution/institution.enum";
import { SchoolTypeEnum } from "src/app/shared/enums/school/school.enum";
import { StatusEnum } from "src/app/shared/enums/status/status.enum";
import { State, Street } from "../cities/citiy.model";
import { Localization } from "../global/global.model";

export interface School{
    id: number,
    name: Localization,
    establishmentDate: Date
    email: string,
    studentCount: number,
    educationalInstitution: InstitutionEnum,
    code: number,
    number:number,
    terkhisNumber:number
    hasSpecialClasses: boolean,
    address:{
        id: number,
        city: CitiesEnum,
        latitude: number,
        longitutde: number,
        locationURL: string,
        state: State
        street: Street
    }
    state:Localization
    curriculum: Localization
    type: SchoolTypeEnum
    status: StatusEnum
    classification: SchoolClassification,
}


export interface SchoolClassification{
    id: number,
    arabicName: string,
    englishName: string
}

