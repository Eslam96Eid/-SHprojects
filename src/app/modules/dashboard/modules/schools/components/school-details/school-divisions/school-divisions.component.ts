import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { DivisionService } from '../../../services/division/division.service';
import { GradesService } from '../../../services/grade/class.service';

@Component({
  selector: 'app-school-divisions',
  templateUrl: './school-divisions.component.html',
  styleUrls: ['./school-divisions.component.scss']
})
export class SchoolDivisionsComponent implements OnInit,OnChanges {
@Input('selectedGradeId') selectedGradeId=null

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration, gradeid: this.selectedGradeId}
  paginationState={...paginationInitialState}
  schoolGrades$ = this.gradesService.getSchoolGardes(this.schoolId).pipe(map(res=>res.data))

  divisions={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  first = 0
  rows = 4

//   menuItems: MenuItem[]=[
//    {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg',routerLink:'division/1'},
//    {label: this.translate.instant('dashboard.schools.raseAttendance'), icon:'assets/images/shared/clock.svg',routerLink:'division/1/absence-records'},
//    {label: this.translate.instant('dashboard.schools.defineSchedule'), icon:'assets/images/shared/list.svg',routerLink:''},
//    {label: this.translate.instant('dashboard.schools.enterGrades'), icon:'assets/images/shared/edit.svg',routerLink:''},
//  ];
   constructor(
     public translate: TranslateService,
     private exportService :ExportService,
     private route: ActivatedRoute,
     private gradesService:GradesService,
     private divisionService:DivisionService) { }

    ngOnChanges(changes: SimpleChanges): void {

      if(changes['selectedGradeId']) this.filtration.gradeid = changes['selectedGradeId'].currentValue

    }

   ngOnInit(): void {
     this.getSchoolDivisions()

    }

    getSchoolDivisions(){
    this.divisions.loading=true
    this.divisions.list=[]
     this.divisionService.getSchoolDivisions(this.schoolId, this.filtration).subscribe(res=>{
      this.divisions.loading = false
      this.divisions.list = res.data
      this.divisions.totalAllData = res.totalAllData
      this.divisions.total =res.total
     },(err)=>{
      this.divisions.loading = false
     })
   }


   onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
     this.getSchoolDivisions()
   }

   clearFilter(){
     this.filtration.KeyWord =''
     this.filtration.gradeid = null
     this.getSchoolDivisions()
   }


   onExport(fileType: FileEnum, table:Table){
     this.exportService.exportFile(fileType, table, this.divisions.list)
   }

   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getSchoolDivisions()

   }

}
