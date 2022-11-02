import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';

const routes: Routes = [
  { path: "System-Setting", component: SystemSettingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
