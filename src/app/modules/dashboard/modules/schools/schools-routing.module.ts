import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
  },
  {
    path: 'school/:schoolId',
    component: SchoolDetailsComponent,
  },
  {
    path: 'transfer-students',
    component: TransferGroupComponent,
  },

  { path: 'school/:schoolId/grade/:gradeId', loadChildren: () => import('./components/school-class/school-class.module').then(m => m.SchoolClassModule) },
  { path: 'school/:schoolId/division/:divisionId', loadChildren: () => import('./components/school-division/school-division.module').then(m => m.SchoolDivisionModule) },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
