export interface Localization{
    ar: string
    en: string,
}

export interface Curriculum{
    id: number,
    name:Localization,
}

export interface Grade{
    id: number,
    name:Localization,
}

export interface Track{
    id: number,
    name:Localization,
}
export interface Curriculum{
    id: number,
    name:Localization,
}

export interface Division{
    id: number,
    name:Localization,
}


export interface OptionalSubjects{
    id: number,
    name:Localization,
}

export interface GenericResponse<T>{
  result?:T
  data: T
  total:number
  totalAllData:number
  statusCode:string

}
export interface Division{
  id: number,
  name:Localization,
  hasTrack?: boolean
  isAcceptStudent?:boolean

}
export interface shool_DDL {
    id: number
    name: Name
  }
  
  export interface Name {
    en: string
    ar: string
  }
