
import { ISurvey } from 'src/app/core/Models/ISurvey';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { faAngleRight, faAngleLeft, faHouse, faSearch, faFilter, faHome, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Paginator } from 'primeng/paginator';


import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AssignmentServiceService } from '../../../assignments/service/assignment-service.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SurveyService } from '../../service/survey.service';


@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveysListComponent implements OnInit {

  @ViewChild('pagination') pagination: Paginator;
  page: number = 1;
  first = 1
  rows = 4
  pagesArrOptions = []
  totalItems: number = 1;
  currentActivePage = { page: 1 }
  paginationState: paginationState = { ...paginationInitialState }
  isLoaded = false;
  assignmentList: ISurvey[] = [];
  pageNum = 1;
  pageSize = 50;
  searchKey: string = '';
  filtration = {...Filtration,IndexTypeId: '',indexStatus:''};
     @ViewChild('namebutton', { read: ElementRef, static:false }) namebutton: ElementRef;
  faEllipsisVertical = faEllipsisVertical;

  allIndexesLength:number=1;
  fixedLength:number=0;
  indexListType;
  indexStatusList;
  get StatusEnum() { return StatusEnum }
  indexes={
    total:0,
    list:[],
    loading:true
  }
  componentHeaderData: IHeader = {

      'breadCrump': [
        { label: this.translate.instant('dashboard.surveys.surveyList'),routerLink:'/dashboard/educational-settings/surveys' }],

  };
  constructor(
    private headerService: HeaderService,
    public translationService: TranslationService,
    private translate: TranslateService,
    private router: Router,
    private Surveyservice: SurveyService,
    private toastrService:ToastService) { }


    getSurveyList(search = '', sortby = '', pageNum = 1, pageSize = 100, sortColumn = '', sortDir = '') {
    this.Surveyservice.getSurveyList(search, sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {

      this.assignmentList = response?.data;
      this.totalItems = this.assignmentList.length;
      this.isLoaded = true;
    })

  }

  pageChanged(event: any) {
    this.pageNum = event.page;
  }

  ngOnInit(): void {
    this.getSurveyList();
    // this.assignmentList.filter(er=>{
    //   console.log(er);

    //   if(er.surveyStatus == 'New' ){
    //     console.log(er);
    //     console.log(true);


    //     this.namebutton.nativeElement.classList.add('newStatus')
    //     this.namebutton.nativeElement.classList.remove('sentStatus')
    //     this.namebutton.nativeElement.classList.remove('closeStatus')
    //   }
    //   if(er.surveyStatus == 'Sent' ){
    //     this.namebutton.nativeElement.classList.remove('newStatus')
    //     this.namebutton.nativeElement.classList.add('sentStatus')
    //     this.namebutton.nativeElement.classList.remove('closeStatus')
    //   }
    //   if(er.surveyStatus == 'CLose' ){
    //     this.namebutton.nativeElement.classList.remove('newStatus')
    //     this.namebutton.nativeElement.classList.remove('sentStatus')
    //     this.namebutton.nativeElement.classList.add('closeStatus')
    //   }
    // })
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.surveys.surveyList'), routerLink: '/dashboard/educational-settings/surveys', routerLinkActiveOptions: { exact: true } }],
      }
    );
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getSurveyList(searchData, '', 1, 50, '', "asc");
  }



   notAvailable(): void {
    this.toastrService.warning(this.translate.instant('noURLFound'));
   }
}
