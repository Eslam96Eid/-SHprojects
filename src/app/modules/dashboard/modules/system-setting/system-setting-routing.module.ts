import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GracePeriodComponent } from './components/grace-period/grace-period.component';
import { SystemSettingComponent } from './system-setting.component';

const routes: Routes = [
  { path: "", component: SystemSettingComponent},
  { path: "grace-period/new", component: GracePeriodComponent},
  { path: "grace-period/edit/id", component: GracePeriodComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
