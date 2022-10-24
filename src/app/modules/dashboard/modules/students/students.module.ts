import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { TransferStudentComponent } from './components/transfer-student/transfer-student.component';
import { DashboardSharedModule } from '../shared/dashboard-shared/dashboard-shared.module';
import { IssuanceOfACertificateComponent } from './components/issuance-of-a-certificate/issuance-of-a-certificate.component';




@NgModule({
  declarations: [
    StudentsListComponent,
    DeletedStudentComponent,
    StudentDetailsComponent,
    TransferStudentComponent,
    IssuanceOfACertificateComponent,

  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    PrimngModule,
    SharedModule,
    DashboardSharedModule
  ]
})
export class StudentsModule { }
