import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestListComponent } from './Component/request-list/request-list.component';
import { RequestdetailsComponent } from './Component/requestdetails/requestdetails.component';

const routes: Routes = [
  { path: "Request-List", component:RequestListComponent },
  {path:"Requestdetails",component:RequestdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestListRoutingModule { }
