export interface Iassignments {
    id: number
    name: IName
    schoolName: string
    subjectName: ISubjectName
    gradeName: IGradeName
    curriculmName: ICurriculmName
    examShowTime: string
    examShowDate: string
    examStatus: string
    schoolCount: number
    examPdfPath: string
    examAudioPath: string
  }
 


  export interface IName {
    en: string
    ar: string
  }

  export interface ISubjectName {
    en: string
    ar: string
  }

  export interface IGradeName {
    en: string
    ar: string
  }

  export interface ICurriculmName {
    en: string
    ar: string
  }
