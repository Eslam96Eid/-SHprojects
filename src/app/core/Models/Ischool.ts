export interface Ischool {
    id: number
    name: IName
    curriculum: ICurriculum
    state: IState
    studentCount: number
    city: string
    status: string
    establishmentDate: string
  }
  
  export interface IName {
    en: string
    ar: string
  }
  
  export interface ICurriculum {
    en: string
    ar: string
  }
  
  export interface IState {
    en: string
    ar: string
  }
  