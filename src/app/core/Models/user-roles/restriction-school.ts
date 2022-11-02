import { Localization } from "../global/global.model";

export interface IRestrictionSchool {
    id:number;
    name:Localization;
    state:Localization;
    curriculum: Localization;
    isSelected:boolean;
}
