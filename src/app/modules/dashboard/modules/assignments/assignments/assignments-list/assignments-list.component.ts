
import { AssignmentServiceService } from './../../service/assignment-service.service';
import { formatDate } from '@angular/common';

import { Router } from '@angular/router';
import { faAngleRight, faAngleLeft, faHouse, faSearch, faFilter, faHome, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Paginator } from 'primeng/paginator';

import { HeaderService } from 'src/app/core/services/header-service/header.service';

import { Iassignments } from '../../../../../../core/Models/Iassignments';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';




@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {

  @ViewChild('pagination') pagination: Paginator;
  page: number = 1;
  first = 1
  rows = 6
  pagesArrOptions = []
  totalItems: number = 1;
  currentActivePage = { page: 1 }
  paginationState: paginationState = { ...paginationInitialState }
  isLoaded = false;
  assignmentList: Iassignments[] = [];
  pageNum = 1;
  pageSize = 50;
  searchKey: string = '';
  filtration = {...Filtration,IndexTypeId: '',indexStatus:''};

  faEllipsisVertical = faEllipsisVertical;

  allIndexesLength:number=1;
  fixedLength:number=0;
  indexListType;
  indexStatusList;

  indexes={
      totalAllData:0,
      total:0,
      list:[],
      loading:true
      }

  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }],

  };

  constructor(
    private headerService: HeaderService,

    private translate: TranslateService,
    private router: Router,
    private assignmentservice: AssignmentServiceService,
    private toastrService:ToastService) { }


  getAssignmentList(search = '', sortby = '', pageNum = 1, pageSize = 100, sortColumn = '', sortDir = '') {
    this.indexes.loading=true
    this.indexes.list=[]
    this.assignmentservice.getAssignmentList(search, sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {
      if(response.data){

        this.assignmentList = response.data;
        this.indexes.totalAllData = response.total
        this.totalItems =response.total;
        this.indexes.loading = false;
        this.isLoaded = true;

      }
          },err=> {
            this.indexes.loading=false
            this.indexes.total=0;

            })


  }

  pageChanged(event: any) {
    this.pageNum = event.page;
  }

  ngOnInit(): void {
    this.getAssignmentList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }],
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
    this.getAssignmentList(searchData, '', 1, 50, '', "asc");
  }

  exportPdf(prod : any): void {
    if (prod && prod.examPdfPath != null) {
      window.open(prod.examPdfPath, '_blank').focus();
    } else {
      this.notAvailable();
    }
   }
   exportAudio(prod : any){
    if (prod && prod.examAudioPath != null) {
      window.open(prod.examAudioPath, '_blank').focus();
    } else {
      this.notAvailable();
    }
   }

   notAvailable(): void {
    this.toastrService.warning(this.translate.instant('noURLFound'));
   }
}
