import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveysModule } from './modules/surveys/surveys.module';
import { ReportsManagmentModule } from './modules/reports-managment/reports-managment.module';
import { DashboardPanalComponent } from './components/dashboard-panal/dashboard-panal.component';
import { RegisterChildComponent } from './modules/shared/components/register-child/register-child.component';
import { DashboardSharedModule } from './modules/shared/dashboard-shared/dashboard-shared.module';












@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPanalComponent,







  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReportsManagmentModule,
    DashboardSharedModule,
  ]
})
export class DashboardModule { }
