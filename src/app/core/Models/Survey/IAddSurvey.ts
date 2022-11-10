export interface IAddSurvey {
    title: ITitle
    surveyType: number
    surveyQuestions: ISurveyQuestion[]
  }

  export interface ITitle {
    en: string
    ar: string
  }

  export interface ISurveyQuestion {
    surveyQuestionType: number
    questionText: string
    attachment: string
    questionChoices: string[]
  }


