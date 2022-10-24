import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';
import { HeaderDashboardComponent } from '../modules/dashboard/components/header-dashboard/header-dashboard.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ClickOutsideDirective } from '../shared/directives/click-outside/click-outside.directive';



@NgModule({
  declarations: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent,ClickOutsideDirective],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    CalendarModule,
    BreadcrumbModule

    
 
  ],
  exports: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent,ClickOutsideDirective]
})
export class LayoutModule { }
