import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeaRegisterChildComponent } from './spea-register-child.component';

const routes: Routes = [{ path: '', component: SpeaRegisterChildComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeaRegisterChildRoutingModule { }
