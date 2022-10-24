import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterChildComponent } from '../components/register-child/register-child.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsComponent } from '../components/schools/schools.component';
import { MedicalFileComponent } from '../components/register-child/medical-file/medical-file.component';
import { AttachmentsChildComponent } from '../components/register-child/attachments-child/attachments-child.component';
import { AbsenceDetailsComponent } from '../components/register-child/absence-details/absence-details.component';
import { AcceptInformationComponent } from '../components/register-child/accept-information/accept-information.component';
import { PersonalInformationComponent } from '../components/register-child/personal-information/personal-information.component';





@NgModule({
  declarations: [
    RegisterChildComponent,
    SchoolsComponent,
    MedicalFileComponent,
    AttachmentsChildComponent,
    AbsenceDetailsComponent,
    AcceptInformationComponent,
    PersonalInformationComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PrimngModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports:[RegisterChildComponent,SchoolsComponent,MedicalFileComponent,AttachmentsChildComponent,AbsenceDetailsComponent]
})
export class DashboardSharedModule { }
