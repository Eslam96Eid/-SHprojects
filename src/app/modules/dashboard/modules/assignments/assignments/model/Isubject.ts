export interface Isubject {
    id: number
    subjectName: ISubjectName
    evaluationType: string
    subjectMinmumDegree: number
    subjectCode: string
    createdDate: string
    creatorName: string
    lastEditedDate: string
    editorName: string
  }
  
  export interface ISubjectName {
    en: string
    ar: string
  }
  