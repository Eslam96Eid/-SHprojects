import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../../../primng/primng.module';
import { EditNewAssessmentComponent } from './components/edit-new-assessment/edit-new-assessment.component';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';

@NgModule({
  declarations: [
    EditNewAssessmentComponent,
    AssessmentsListComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
   TranslateModule,
    SharedModule,
    PrimngModule

  ]
})
export class AssessmentModule { }
