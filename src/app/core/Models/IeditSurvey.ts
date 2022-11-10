export interface IEditSurvey {
    surveyNumber: number
    surveyTitle: ISurveyTitle
    surveyType: string
    surveyStatus: string
    createdDate: string
    createdBy: any
    responsesTotalNumber: number
    targetGuardianNumber: number
    surveyQuestions: ISurveyQuestion[]
    surveySendingDate: string
    surveySendingBy: any
    apperanceDate: string
    disApperanceDate: string
    targetGuardians: any
  }
  
  export interface ISurveyTitle {
    en: string
    ar: string
  }
  
  export interface ISurveyQuestion {
    surveyQuestionType: string
    questionText: string
    attachment: any
    questionChoices: any[]
  }
  