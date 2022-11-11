import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeaRegisterChildRoutingModule } from './spea-register-child-routing.module';
import { SpeaRegisterChildComponent } from './spea-register-child.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpeaRegisterChildComponent
  ],
  imports: [
    CommonModule,
    SpeaRegisterChildRoutingModule,
    PrimngModule,
    SharedModule
  ]
})
export class SpeaRegisterChildModule { }
