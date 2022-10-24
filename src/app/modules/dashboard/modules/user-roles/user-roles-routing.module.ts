import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserRoleComponent } from './components/new-user-role/new-userrole.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { UserRolesListComponent } from './components/user-roles-list/userroles-list.component';



const routes: Routes = [
  {path:"user-roles-list",component:UserRolesListComponent},
{path:"new-role",component:NewUserRoleComponent},
{path:"edit-role/:roleId",component:NewUserRoleComponent},
{path:"role-details/:roleId", component:RoleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class UserRolesRoutingModule { }
