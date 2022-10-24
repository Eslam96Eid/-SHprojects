import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { AssignmentsListComponent } from './assignments/assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './assignments/upload-assignment/upload-assignment.component';
import { AssignmentRoutingModule } from './assignments-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from "primeng/card";
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';



@NgModule({
  declarations: [
    AssignmentsListComponent,
    UploadAssignmentComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    PrimngModule,

    CalendarModule,
    FileUploadModule,
    TranslateModule,
    CardModule,
    SharedModule,
    MessageModule,
    MessagesModule

  ],
  providers:[MessageService]
})
export class AssignmentsModule { }
