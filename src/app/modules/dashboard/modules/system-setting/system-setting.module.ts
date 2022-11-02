import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationsytemComponent } from './components/notificationsytem/notificationsytem.component';
import { GraceSessionComponent } from './components/grace-session/grace-session.component';
import { RegistrationConditionsComponent } from './components/registration-conditions/registration-conditions.component';

@NgModule({
  declarations: [
    SystemSettingComponent,
    NotificationsytemComponent,
    GraceSessionComponent,
    RegistrationConditionsComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    CommonModule,

    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
  ]
})
export class SystemSettingModule { }
