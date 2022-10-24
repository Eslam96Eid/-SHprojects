import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsRoutingModule } from './parents-routing.module';
import { ParantsComponent } from './components/parents-list/parants.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { RegisterChildComponent } from '../shared/components/register-child/register-child.component';
import { UnregisterChildComponent } from './components/unregister-child/unregister-child.component';
import { DashboardSharedModule } from '../shared/dashboard-shared/dashboard-shared.module';
import { ParentService } from './services/parent.service';



@NgModule({
  declarations: [
    ParantsComponent,
    ChildrenListComponent,
    ChildDetailsComponent,
    UnregisterChildComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    PrimngModule,
    DashboardSharedModule
  ],
  providers: [ParentService]
})
export class ParantsModule { }

