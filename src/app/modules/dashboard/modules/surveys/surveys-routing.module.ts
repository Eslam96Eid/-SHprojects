import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSurveyComponent } from './components/new-survey/new-survey.component';
import { SendSurveyComponent } from './components/send-survey/send-survey.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { SurveyReportComponent } from './components/survey-report/survey-report.component';
import { SurveysListComponent } from './components/surveys-list/surveys-list.component';

const routes: Routes = [

  {path:'' , component: SurveysListComponent},
  {path:'new-survey' , component: NewSurveyComponent},
  {path:'send-survey' , component: SendSurveyComponent},
  {path:'survey-report' , component: SurveyReportComponent},
  {path:'survey-details' , component: SurveyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
