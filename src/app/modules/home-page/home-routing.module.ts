import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'parents',
        loadChildren: () => import('./components/parents/parents.module').then(m => m.ParentsModule)
      },
      {
        // path:'sharjah-authourity' ,
        path: '',
        loadChildren: () => import('./components/sharjah-authority/sharjah-authority.module').then(m => m.SharjahAuthorityModule)
      },
      {
        path: 'school',
        loadChildren: () => import('./components/school/school.module').then(m => m.SchoolModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
