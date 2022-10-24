import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharjahAuthorityComponent } from './sharjah-authority.component';

const routes: Routes = [
  {path:'', component: SharjahAuthorityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharjahAuthorityRoutingModule { }
