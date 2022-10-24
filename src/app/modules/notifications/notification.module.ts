import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './component/notification-list/notification-list.component';
import { NotificationDetailsComponent } from './component/notification-details/notification-details.component';
import { PrimngModule } from '../primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ NotificationListComponent,
    NotificationDetailsComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    PrimngModule,
    SharedModule
  ]
})
export class NotificationModule { }
