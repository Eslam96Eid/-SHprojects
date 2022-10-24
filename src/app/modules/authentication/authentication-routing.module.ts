import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationMainComponent } from './components/authentication-main/authentication-main.component';


const routes: Routes = [
  {
    path: 'login',component: AuthenticationMainComponent,
    data: { title: 'Login' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
