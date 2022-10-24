import { CitiesEnum } from "src/app/shared/enums/cities/city.enum";
import { Localization } from "../global/global.model";

export interface City{
    name: CitiesEnum
}

export interface State{
    id:string,
    name: Localization
}

export interface Street{
    id:string,
    name: Localization
}