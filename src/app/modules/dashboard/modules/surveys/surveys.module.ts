import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysListComponent } from './components/surveys-list/surveys-list.component';
import { NewSurveyComponent } from './components/new-survey/new-survey.component';
import { SendSurveyComponent } from './components/send-survey/send-survey.component';
import { SurveyReportComponent } from './components/survey-report/survey-report.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";


@NgModule({
  declarations: [
    SurveysListComponent,
    NewSurveyComponent,
    SendSurveyComponent,
    SurveyReportComponent,
    SurveyDetailsComponent
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    SharedModule,
    PrimngModule,
     NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class SurveysModule { }
