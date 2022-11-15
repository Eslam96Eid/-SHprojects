export interface IEditNewSurvey {
    title: ITitle
    surveytype: number
    surveyQuestions: ISurveyQuestion[]
  }
  
  export interface ITitle {
    en: string
    ar: string
  }
  
  export interface ISurveyQuestion {
    surveyQuestionType: number
    questionText: string
    optionalAttachment: any
    attachment?: string
    questionChoices?: string[]
  }
  