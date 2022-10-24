import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInformationRoutingModule } from './user-information-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { PrimngModule } from 'src/app/modules/primng/primng.module';

import { ViewListOfUsersComponent } from './components/users-list/users-list.component';
import { AddEditUserInformationComponent } from './components/edit-new-user-information/edit-new-user-information.component';
import { AddNewUserInformationComponent } from './components/add-new-user-information/add-new-user-information.component';


@NgModule({
  declarations: [ViewListOfUsersComponent,AddEditUserInformationComponent, AddNewUserInformationComponent],
  imports: [
    CommonModule,
    UserInformationRoutingModule,
    PrimngModule,
   SharedModule ,
   FormsModule,
   FontAwesomeModule,
   HttpClientModule,
   TranslateModule
  
  ]
})
export class UserInformationModule { }
