import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditNewSchoolyearComponent } from './component/edit-new-school-year/edit-new-schoolyear.component';
import { SchoolyearsListComponent } from './component/school-years-list/schoolyears-list.component';

const routes: Routes = [
  {path:"school-years-list",component:SchoolyearsListComponent},
{path:"new-school-year",component:EditNewSchoolyearComponent},
{path:"edit-school-year/:schoolyearId",component:EditNewSchoolyearComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolYearsRoutingModule { }
