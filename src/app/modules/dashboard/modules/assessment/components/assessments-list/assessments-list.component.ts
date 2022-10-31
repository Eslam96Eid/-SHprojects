import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { faAngleLeft, faAngleRight, faCheck, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import { IAssesment } from 'src/app/core/models/iassesment';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

import { AssessmentService } from '../../service/assessment.service';
import { IHeader, paginationState } from 'src/app/core/Models';
import { IRate } from '../edit-new-assessment/edit-new-assessment.model';
import { Filter } from 'src/app/core/models/filter/filter';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
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
  filtration: Filter = { ...Filtration }
  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }],

  };
  // rateList: Array<IRate> = [];
  assessmentList = {
    totalAllData: 0,
    total: 0,
    list: [],
    loading: true
  }

  constructor(private exportService: ExportService, private headerService: HeaderService,
    private assessmentService: AssessmentService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.paginationState)
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
    this.assessmentList.loading = true
    this.assessmentList.list = []
    if(this.filtration.PageSize==6)
       { this.filtration.PageSize = 3}
    this.assessmentService.getRates(this.filtration).subscribe(res => {
      debugger
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
    this.filtration.City = null
    this.filtration.StateId = null
    this.filtration.Status = ''
    this.filtration.curricuulumId = null
    this.getRate()
  }
}
