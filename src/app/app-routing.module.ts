import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/services/auth-guard.service';
import { AuthenticationGuard } from './core/services/guards/authentication.guard';
// import { TokenGuard } from './core/services/token-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home-page/home.module').then(
        (a) => a.HomeModule
      ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./modules/notifications/notification.module').then(
        (a) => a.NotificationModule
      ),
    
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (a) => a.DashboardModule
      ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'Ask-for-certificate',
    loadChildren: () =>
      import('./modules/issuance-of-a-certificate-pages/issuance-of-a-certificate-pages.module').then(
        (a) => a.IssuanceOfACertificatePagesModule
      ),
    
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      ),
  },

  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  }

