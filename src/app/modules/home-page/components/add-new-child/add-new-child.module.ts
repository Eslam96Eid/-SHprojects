import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewChildRoutingModule } from './add-new-child-routing.module';
import { AddNewChildComponent } from './add-new-child.component';
import { ReigsterWithNationalityComponent } from './reigster-with-nationality/reigster-with-nationality.component';
import { ReigsterWithoutNationalityComponent } from './reigster-without-nationality/reigster-without-nationality.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AddNewChildComponent,
    ReigsterWithNationalityComponent,
    ReigsterWithoutNationalityComponent
  ],
  imports: [
    CommonModule,
    AddNewChildRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    ToastrModule
  ]
})
export class AddNewChildModule { }
