import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolDivisionComponent } from './school-division.component';

const routes: Routes = [{path:'', component: SchoolDivisionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolDivisionRoutingModule { }
