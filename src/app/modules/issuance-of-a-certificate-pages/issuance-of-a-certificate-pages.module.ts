import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuanceOfACertificatePagesRoutingModule } from './issuance-of-a-certificate-pages-routing.module';
import { AskForIssuanceOfACertificateComponent } from './components/ask-for-issuance-of-a-certificate/ask-for-issuance-of-a-certificate.component';
import { PrimngModule } from '../primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStudentCertificateComponent } from './components/add-student-certificate/add-student-certificate.component';


@NgModule({
  declarations: [
    AskForIssuanceOfACertificateComponent,
    AddStudentCertificateComponent
  ],
  imports: [
    CommonModule,
    IssuanceOfACertificatePagesRoutingModule,
    PrimngModule,
    SharedModule
  ]
})
export class IssuanceOfACertificatePagesModule { }
