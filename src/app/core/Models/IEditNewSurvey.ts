export interface IEditNewSurvey {
    title: ITitle
    surveytype: number
    surveyQuestions: ISurveyQuestionEdit[]
  }
  
  export interface ITitle {
    en: string
    ar: string
  }
  
  export interface ISurveyQuestionEdit {
    surveyQuestionType: number
    questionText: string
    optionalAttachment: any
    attachment?: string
    questionChoices?: string[]
  }
  