import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditNewSubjectComponent } from './components/edit-new-subject/edit-new-subject.component';
import { SubjectsComponent } from './components/subjects-list/subjects-list.component';




const routes: Routes = [
  {path:"subjects-list",component:SubjectsComponent},
  
  {path:"new-subject",component:EditNewSubjectComponent},

  {path:"edit-subject/:subjectId",component:EditNewSubjectComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
