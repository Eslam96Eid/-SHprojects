import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDivisionRoutingModule } from './school-division-routing.module';
import { DivisionStudentsComponent } from './division-students/division-students.component';
import { AbsenceRecordComponent } from './absence-record/absence-record.component';
import { DegreesComponent } from './degrees/degrees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SchoolDivisionComponent } from './school-division.component';


@NgModule({
  declarations: [SchoolDivisionComponent, DivisionStudentsComponent, AbsenceRecordComponent, DegreesComponent,],
  imports: [
    CommonModule,
    SchoolDivisionRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class SchoolDivisionModule { }
