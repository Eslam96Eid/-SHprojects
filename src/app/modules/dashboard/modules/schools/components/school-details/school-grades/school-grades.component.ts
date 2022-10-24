import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/Models';
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

  @Input('students') students=[]
  first = 0
  rows = 4
	schoolId = this.route.snapshot.paramMap.get('schoolId')
  isDialogOpened=false

  filtration={...Filtration}

  constructor(
    private gradesService:GradesService,
    private schoolService: SchoolsService,
    private route: ActivatedRoute,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.getSchoolGrades()
    this.getTracks(this.schoolId)
  }

  getSchoolGrades(){
    this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe()
  }

  getTracks(schoolId){
    this.gradesService.getGradeTracks(schoolId).subscribe()
  }

  openSectionModal() {
		this.isDialogOpened = true
	}


  onSort(e){
    console.log(e);
    this.filtration.SortBy
    this.filtration.SortColumn = e.field
    this.filtration.SortDirection = e.order
    this.getSchoolGrades()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getSchoolGrades()
  }


  onExport(fileType: FileEnum, table:Table){
    this.exportService.exportFile(fileType, table, this.students)
  }

  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page
    this.getSchoolGrades()

  }

}
