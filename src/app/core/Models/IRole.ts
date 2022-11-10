import { Localization } from "./global/global.model";

export interface IRole {
    id: number
    name:Localization,
    scope: string
    ownerId: any
    roleClaims: IRoleClaim[]
    createdDate: string
    updatedDate: any
  }

  export interface IRoleClaim {
    id: number
    title: string
    type: string
  }
