import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewUserInformationComponent } from './components/add-new-user-information/add-new-user-information.component';
import { AddEditUserInformationComponent } from './components/edit-new-user-information/edit-new-user-information.component';
import { ViewListOfUsersComponent } from './components/users-list/users-list.component';

const routes: Routes = [
{path:"users-list",component:ViewListOfUsersComponent},
{path:"new-user",component:AddNewUserInformationComponent},
{path:"edit-user/:userId",component:AddEditUserInformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInformationRoutingModule { }
