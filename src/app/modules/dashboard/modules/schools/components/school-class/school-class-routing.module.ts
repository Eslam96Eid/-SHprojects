import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolClassComponent } from './school-class.component';

const routes: Routes = [{ path: '', component: SchoolClassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolClassRoutingModule { }
