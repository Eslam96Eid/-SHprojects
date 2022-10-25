export interface IunregisterChild {
    id: number
    name: IName
    surname: ISurname
    relativeRelation: IRelativeRelation
    nationality: INationality
    emiratesIdPath: string
    gender: string
    passportNumber: number
    emiratesIdNumber: any
    age: number
    birthDate: string
    imagePath: string
  }
  
  export interface IName {
    en: string
    ar: string
  }
  
  export interface ISurname {
    en: string
    ar: string
  }
  
  export interface IRelativeRelation {
    en: string
    ar: string
  }
  
  export interface INationality {
    en: string
    ar: string
  }
  