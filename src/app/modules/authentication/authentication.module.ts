import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationMainComponent } from './components/authentication-main/authentication-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from 'src/app/layout/layout.module';





@NgModule({
  declarations: [
    AuthenticationMainComponent,
 
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    TranslateModule,
    PrimngModule,
    LayoutModule
    
  ]
})
export class AuthenticationModule { }
