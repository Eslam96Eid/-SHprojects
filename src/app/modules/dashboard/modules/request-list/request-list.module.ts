import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestListRoutingModule } from './request-list-routing.module';
import { RequestListComponent } from './Component/request-list/request-list.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestdetailsComponent } from './Component/requestdetails/requestdetails.component';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  declarations: [
    RequestListComponent,
    RequestdetailsComponent
  ],
  imports: [
    CommonModule,
    RequestListRoutingModule,
    TimelineModule,
    CommonModule,

    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
  ]
})
export class RequestListModule { }
