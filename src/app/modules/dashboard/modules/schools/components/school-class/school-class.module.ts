import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolClassRoutingModule } from './school-class-routing.module';
import { SchoolClassComponent } from './school-class.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SchoolClassComponent
  ],
  imports: [
    CommonModule,
    SchoolClassRoutingModule,
    SharedModule,
    PrimngModule,
    TranslateModule
  ]
})
export class SchoolClassModule { }
