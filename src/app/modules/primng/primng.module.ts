import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {PaginatorModule} from 'primeng/paginator';
import {DividerModule} from 'primeng/divider';
import {ButtonModule } from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {GalleriaModule} from 'primeng/galleria';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {AccordionModule} from 'primeng/accordion';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';


const modules=[
  ToastModule,
  TableModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  DividerModule,
  ButtonModule,
  BreadcrumbModule,
  GalleriaModule,
  DropdownModule,
  InputNumberModule,
  DialogModule,
  AccordionModule,
  CalendarModule,
  CheckboxModule,
  MultiSelectModule,
  PasswordModule,
  ChipsModule,
  ProgressBarModule,
  InputSwitchModule,
  InputTextareaModule,
  ProgressSpinnerModule,
  CardModule,
  ConfirmDialogModule,
  RadioButtonModule,
  TabViewModule,
  SkeletonModule

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    modules

  ],
  exports:[modules]
})
export class PrimngModule { }
