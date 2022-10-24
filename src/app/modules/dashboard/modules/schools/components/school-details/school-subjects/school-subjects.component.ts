import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { GradesService } from '../../../services/grade/class.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss']
})
export class SchoolSubjectsComponent implements OnInit {

  @Input('subjects') subjects=[]

  first = 0;
  rows = 4;
  
  subjectsObj={
    total:0,
    list:[],
    loading:true,
    isGradeSelected:false
  }

  
  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration, GradeId:"", TrackId:"",SchoolId :this.schoolId}
  paginationState={...paginationInitialState}
  
  schoolGrades$ =this.schoolsService.getSchoolsTracks(this.schoolId)
  schoolTracks$ =this.schoolsService.getSchoolGardes(this.schoolId)

  constructor(
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private gradesService:GradesService,
    ) { }

  ngOnInit(): void {

    // this.getSubjects()
  }


  getSubjects(){
    this.subjectsObj.loading=true
    this.subjectsObj.list=[]
    this.schoolsService.getSchoolSubjects(this.filtration).subscribe(res =>{
      this.subjectsObj.loading = false
      this.subjectsObj.list = res.data
      this.subjectsObj.total =res.total
    },err=> {
      this.subjectsObj.loading=false
      this.subjectsObj.total=0
    })
  }

  
  getSchoolClasses(){
    this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe()
  }

  getTracks(schoolId){
    this.gradesService.getGradeTracks(schoolId).subscribe()
  }


  onSort(e){
    console.log(e);
    this.filtration.SortBy
    this.filtration.SortColumn = e.field
    this.filtration.SortDirection = e.order
    this.getSubjects()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getSubjects()
  }


  onExport(fileType: FileEnum, table:Table){
    // this.exportService.exportFile(fileType, table, this.subjects)
  }

  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page
    this.getSubjects()

  }

}
