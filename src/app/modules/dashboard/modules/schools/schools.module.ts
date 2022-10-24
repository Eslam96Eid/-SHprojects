import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsRoutingModule } from './schools-routing.module';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';
import { DashboardSharedModule } from '../shared/dashboard-shared/dashboard-shared.module';
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { QrCodeModule } from 'ng-qrcode';
import { EditListComponent } from './components/school-details/edit-list/edit-list.component';
import { SchoolSubjectsComponent } from './components/school-details/school-subjects/school-subjects.component';
import { AnnulHolidayListComponent } from './components/school-details/annul-holiday-list/annul-holiday-list.component';
import { SchoolEmployeesComponent } from './components/school-details/school-employees/school-employees.component';
import { SchoolDivisionsComponent } from './components/school-details/school-divisions/school-divisions.component';
import { SchoolGradesComponent } from './components/school-details/school-grades/school-grades.component';
import { NgChartsModule } from 'ng2-charts';
import { SchoolChartsComponent } from './components/school-list/school-charts/school-charts.component';
import { SchoolDivisionComponent } from './components/school-division/school-division.component';
@NgModule({
  declarations: [
    SchoolDetailsComponent,
    SchoolListComponent,
    TransferGroupComponent,
    EditListComponent,
    SchoolSubjectsComponent,
    AnnulHolidayListComponent,
    SchoolEmployeesComponent,
    SchoolDivisionsComponent,
    SchoolGradesComponent,
    SchoolChartsComponent,

  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    PrimngModule,
    SharedModule,
    ChartModule,
    PanelModule,
    CardModule,
    DashboardSharedModule,
    NgChartsModule,
  ]
})
export class SchoolsModule { }
