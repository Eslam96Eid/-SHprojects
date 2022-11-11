import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-subjects-and-degrees',
  templateUrl: './subjects-and-degrees.component.html',
  styleUrls: ['./subjects-and-degrees.component.scss']
})
export class SubjectsAndDegreesComponent implements OnInit {


  btnGroupItems=[
    {label:"الفصل الاول", active: false, value:"first"},
    {label:"الفصل الاخير", active: false, value:"second"},
    {label:"النتيجه النهائيه", active: false, value:"second"}
  ]

  filtration :Filter = {...Filtration}
  paginationState= {...paginationInitialState}

  subjects={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(private studentsService:StudentsService) { }

  ngOnInit(): void {
  this.getSubjects()

  }


  getSubjects(){
    this.subjects.loading=true
    this.subjects.list=[]
    this.studentsService.getStudentSubjects(this.filtration).subscribe((res)=>{
      this.subjects.loading = false
      this.subjects.list = res.data
      this.subjects.totalAllData = res.totalAllData
      this.subjects.total =res.total

    },err=> {
      this.subjects.loading=false
      this.subjects.total=0
    })
  }



  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSubjects()
  }

  clearFilter(){
    this.getSubjects()
  }


  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjects()

  }

}
