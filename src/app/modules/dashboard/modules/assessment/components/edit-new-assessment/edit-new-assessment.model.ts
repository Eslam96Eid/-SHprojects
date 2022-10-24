export interface IRate {
    id?: number;
    name: {
      en: string,
      ar: string
    };
    max: number;
    min: number;
    rateScores: IRateScores[];
}

export interface IRateScores {
  id?: number;
  code: string;
  from: number;
  to: number;
  isSuccess: boolean;
  rateID?: number;
}