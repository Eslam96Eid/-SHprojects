import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRolesRoutingModule } from './user-roles-routing.module';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { UserRolesListComponent } from './components/user-roles-list/userroles-list.component';
import { NewUserRoleComponent } from './components/new-user-role/new-userrole.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';



@NgModule({
  declarations: [UserRolesListComponent,
    NewUserRoleComponent,
    RoleDetailsComponent],
  imports: [
    CommonModule,
    UserRolesRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    ToastrModule

  ]
})
export class UserRolesModule { }
