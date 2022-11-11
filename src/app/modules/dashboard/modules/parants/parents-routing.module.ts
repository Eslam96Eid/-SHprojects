import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ParantsComponent } from './components/parents-list/parants.component';
import { UnregisterChildComponent } from './components/unregister-child/unregister-child.component';

const routes: Routes = [
  { path: '', component: ParantsComponent },
  { path: 'parent/:id/all-children', component: ChildrenListComponent, children:[] },
   { path: 'parent/:id/all-children/child/:id', component: ChildDetailsComponent },
  { path: 'parent/:id/child/:id/unregister-child', component: UnregisterChildComponent },
  { path: 'parent/:id/all-children/child/:id/register', loadChildren: () => import('./components/spea-register-child/spea-register-child.module').then(m => m.SpeaRegisterChildModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
