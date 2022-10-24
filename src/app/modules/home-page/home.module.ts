import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ParentsComponent } from '../home-page/components/parents/parents.component';
import { SharjahAuthorityComponent } from '../home-page/components/sharjah-authority/sharjah-authority.component';
import { SchoolComponent } from '../home-page/components/school/school.component';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';


@NgModule({
  declarations: [
    HomeComponent,
    ParentsComponent,
    SharjahAuthorityComponent,
    SchoolComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class HomeModule { }
