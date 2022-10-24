import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';

const routes: Routes = [

  {path:'', children:[
    {path: 'students-reports', component:StudentsReportsComponent},
    {path: 'degrees-reports', component:DegreesReportsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsManagmentRoutingModule { }
