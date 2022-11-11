import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Track } from 'src/app/core/Models/global/global.model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { GradesService } from '../../../services/grade/class.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-grades',
  templateUrl: './school-grades.component.html',
  styleUrls: ['./school-grades.component.scss']
})
export class SchoolGradesComponent implements OnInit {
  @Output() setActiveTab =new EventEmitter<number>()
  @Output() selectedGradeId = new EventEmitter<number>()
lo
  first = 0
  rows = 4
	schoolId = this.route.snapshot.paramMap.get('schoolId')
  isDialogOpened=false

  filtration={...Filtration}
  paginationState={...paginationInitialState}

  grades={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  gradeTracks:Track[]

  constructor(
    private gradesService:GradesService,
    private schoolService: SchoolsService,
    private route: ActivatedRoute,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.getSchoolGrades()
  }

  getSchoolGrades(){
    this.grades.loading=true
    this.grades.list=[]
    this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe(res=>{
      this.grades.loading = false
      this.grades.list = res.data
      this.grades.totalAllData = res.totalAllData
      this.grades.total =res.total
    })
  }



  showTracks(gradeId){
    this.gradesService.getGradeTracks(this.schoolId,gradeId).subscribe(res =>{
      this.gradeTracks = res.data
    })
    this.isDialogOpened=true
  }




  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSchoolGrades()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getSchoolGrades()
  }


  onExport(fileType: FileEnum, table:Table){
    this.exportService.exportFile(fileType, table, this.grades.list)
  }

  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page
    this.getSchoolGrades()

  }

}
