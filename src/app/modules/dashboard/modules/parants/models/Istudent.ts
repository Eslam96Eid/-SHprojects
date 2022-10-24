export interface Istudent {
    id: number
    name: IName
    age: number
    imagePath: any
    relativeRelation: IRelativeRelation
    school: ISchool
    grade: IGrade
  }
  
  export interface IName {
    en: string
    ar: string
  }
  
  export interface IRelativeRelation {
    en: string
    ar: string
  }
  
  export interface ISchool {
    en: string
    ar: string
  }
  
  export interface IGrade {
    en: string
    ar: string
  }
  