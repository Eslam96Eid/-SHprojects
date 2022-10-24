import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/Models';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-school-divisions',
  templateUrl: './school-divisions.component.html',
  styleUrls: ['./school-divisions.component.scss']
})
export class SchoolDivisionsComponent implements OnInit {

  @Input('students') students=[]

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration}
 
  cols=[
   { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
   { field: 'name', header: 'Name' },
   { field: 'category', header: 'Category' },
   { field: 'quantity', header: 'Quantity' }
  ]
 
 
  first = 0
  rows = 4
 
  menuItems: MenuItem[]=[
   {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg',routerLink:'division/1'},
   {label: this.translate.instant('dashboard.schools.raseAttendance'), icon:'assets/images/shared/clock.svg',routerLink:'division/1/absence-records'},
   {label: this.translate.instant('dashboard.schools.defineSchedule'), icon:'assets/images/shared/list.svg',routerLink:''},
   {label: this.translate.instant('dashboard.schools.enterGrades'), icon:'assets/images/shared/edit.svg',routerLink:''},
 ];
   constructor(
     public translate: TranslateService,
     private exportService :ExportService,
     private route: ActivatedRoute,
     private divisionService:DivisionService) { }
 
   ngOnInit(): void {
     this.getSchoolDivisions()
   }
 
   getSchoolDivisions(){
     this.divisionService.getSchoolDivisions(this.schoolId, this.filtration).subscribe()
   }
 
 
   onSort(e){
     console.log(e);
     this.filtration.SortBy
     this.filtration.SortColumn = e.field
     this.filtration.SortDirection = e.order
     this.getSchoolDivisions()
   }
 
   clearFilter(){
     this.filtration.KeyWord =''
     this.getSchoolDivisions()
   }
 
 
   onExport(fileType: FileEnum, table:Table){
     this.exportService.exportFile(fileType, table, this.students)
   }
 
   paginationChanged(event: paginationState) {
     console.log(event);
     this.first = event.first
     this.rows = event.rows
 
     this.filtration.Page = event.page
     this.getSchoolDivisions()
 
   }

}
