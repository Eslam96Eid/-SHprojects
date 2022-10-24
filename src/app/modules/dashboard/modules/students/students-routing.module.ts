import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { IssuanceOfACertificateComponent } from './components/issuance-of-a-certificate/issuance-of-a-certificate.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TransferStudentComponent } from './components/transfer-student/transfer-student.component';

const routes: Routes = [
  { path: "", component: StudentsListComponent },
  { path: "student/:id", component: StudentDetailsComponent },
  // "byWho" refer to who will transfer the student, The parent or the commission(رئيس او موظفين الهيئه)
  // { path: "student/:id/transfer/:byWho", component: TransferStudentComponent },
  { path: "student/:id/transfer", component: TransferStudentComponent , data:{mode: 'transfer'}},
  { path: "student/:id/register", component: TransferStudentComponent , data:{mode: 'register'}},
  { path: "delete-student/:id", component: DeletedStudentComponent },
  { path: "student/:id/IssuanceOfACertificateComponent", component: IssuanceOfACertificateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
