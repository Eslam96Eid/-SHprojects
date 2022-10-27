
import { AssignmentServiceService } from './../../service/assignment-service.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Paginator } from 'primeng/paginator';
import { IHeader, paginationState } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Iassignments } from '../model/Iassignments';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';




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
  searchKey: string = '';
  filtration = {...Filtration,IndexTypeId: '',indexStatus:''};

  faEllipsisVertical = faEllipsisVertical;

  allIndexesLength:number=1;
  fixedLength:number=0;
  indexListType;
  indexStatusList;

  indexes={
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
    private assignmentservice: AssignmentServiceService) { }


  getAssignmentList(search :string, sortby :string, pageNum :number, pageSize :number, sortColumn :string, sortDir :string) {
    this.assignmentservice.getAssignmentList(search, sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {
      this.assignmentList = response?.data;
      this.totalItems = response.total;
      this.isLoaded = true;
    })

  }

  pageChanged(event: any) {
    this.pageNum = event.page;
  }

  ngOnInit(): void {
    this.getAssignmentList('', '', 1, 6, '', "asc");
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }],
      }
    );
  }
  onTableDataChange(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows
    this.getAssignmentList('', '', event.page, 6, '', "asc");
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getAssignmentList(searchData, '', 1, 6, '', "asc");
  }

  exportPdf(examPath : any){
    window.open(examPath, '_blank').focus();
   }
   exportAudio(examPath : any){
    window.open(examPath, '_blank').focus();
   }
   
}
