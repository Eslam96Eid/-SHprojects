import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';
import { EditNewAssessmentComponent } from './components/edit-new-assessment/edit-new-assessment.component';


const routes: Routes = [
{path:"assements-list",component:AssessmentsListComponent},
{path:"new-assessment",component:EditNewAssessmentComponent},
{path:"edit-assessment/:id",component:EditNewAssessmentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
