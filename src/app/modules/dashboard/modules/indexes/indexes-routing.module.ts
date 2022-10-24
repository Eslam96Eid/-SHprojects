import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditNewIndexComponent } from './components/edit-new-Index/edit-new-index.component';
import { IndexesComponent } from './components/indexes-list/indexes-list.component';

const routes: Routes = [
  { path: "indexes-list", component: IndexesComponent },
  { path: "new-index", component: EditNewIndexComponent },
  { path: "edit-index/:indexId", component: EditNewIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexesRoutingModule { }
