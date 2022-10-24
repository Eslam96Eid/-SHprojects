import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ParantsComponent } from './components/parents-list/parants.component';

const routes: Routes = [
  { path: '', component: ParantsComponent },
  { path: 'parent/:id/all-children', component: ChildrenListComponent, children:[] },
  { path: 'parent/:id/all-children/child/:id', component: ChildDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
