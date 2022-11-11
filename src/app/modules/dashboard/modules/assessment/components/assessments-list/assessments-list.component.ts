import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { faAngleLeft, faAngleRight, faCheck, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import { IAssesment } from 'src/app/core/models/iassesment';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

import { AssessmentService } from '../../service/assessment.service';
import { IRate } from '../edit-new-assessment/edit-new-assessment.model';
import { Filter } from 'src/app/core/models/filter/filter';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
  isShown:boolean=false;
  isShownfiltration:boolean=false;
  checked:boolean=true;
  faEllipsisVertical = faEllipsisVertical;
  paginationState= {...paginationInitialState}
  //assessmentList: IAssesment[] = [];
  first = 0;
  rows = 3;
  cities: string[];
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  plusIcon = faPlus;
  checkIcon= faCheck;
  status = '';
  filtration: Filter = { ...Filtration , status : null }
  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }],

  };
  selectedStatus:any;
  filteration_status = [
    {name: 'نعم', code: true},
    {name: 'لا', code: false}
];
  // rateList: Array<IRate> = [];
  assessmentList = {
    totalAllData: 0,
    total: 0,
    list: [],
    loading: true
  }

  constructor(private exportService: ExportService, private headerService: HeaderService,
    private assessmentService: AssessmentService, private translate: TranslateService, private router: Router) { }
   isAdmin =false;
  ngOnInit(): void {
    let userRole =JSON.parse(localStorage.getItem('$AJ$user'));
    userRole.roles.forEach(element => {
      if(element.name=='Admin'){
        this.isAdmin=true;
      }
    });
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getRate();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getRate();
  }


  gotoAddAssessment() {
    this.router.navigate(['/dashboard/educational-settings/assessments/new-assessment']);
  }

  navigateToEditAssessment(id: number): void {
    this.router.navigateByUrl(`/dashboard/educational-settings/assessments/edit-assessment/${id}`);
  }

  private getRate(): void {
    if(this.selectedStatus){
      this.filtration.status=this.selectedStatus.code;
    }
    this.assessmentList.loading = true
    this.assessmentList.list = []
    this.assessmentService.getRates(this.filtration).subscribe(res => {

      this.assessmentList.loading = false
      this.assessmentList.list = res.data
      this.assessmentList.totalAllData = res.totalAllData
      this.assessmentList.total = res.total
    }, err => {
      this.assessmentList.loading = false
      this.assessmentList.total = 0
    })
  }

  onSort(e) {
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.getRate()
  }
  onExport(fileType: FileEnum, table: Table) {
    this.exportService.exportFile(fileType, table, this.assessmentList.list)
  }
  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.status = null
    this.selectedStatus = null
    this.getRate()
  }
  isToggleLabel(e)
  {
    if(e.checked)
    {
      this.isShown=true;
    }
    else{
      this.isShown=false;
    }
  }
  isToggleLabelFiltration(e)
  {
    if(e.checked)
    {
      this.isShownfiltration=true;
      this.filtration.status=false;
    }
    else{
      this.isShownfiltration=false;
      this.filtration.status=true;
    }
  }
  onChange(event: any ) {
    this.selectedStatus= event.value;
}

}
