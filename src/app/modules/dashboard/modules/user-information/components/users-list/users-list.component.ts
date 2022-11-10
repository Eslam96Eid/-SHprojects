import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { FormBuilder } from '@angular/forms';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { IRole } from 'src/app/core/Models/IRole';
import { IAccount } from 'src/app/core/Models/IAccount';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { UserService } from 'src/app/core/services/user/user.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';



@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  selectedRole:any
  paginationState= {...paginationInitialState}
  @Input('hasFilter') hasFilter:boolean=true;
  roles: any[] = [];
  isLoaded = false;
  searchKey: string = '';
  first = 0;
  rows = 6;
  usersList: IUser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  @Input('filterFormControls') formControls:string[] =[]
  usersStatus = this.sharedService.statusOptions
  isactive:any;
  showFilterBox = false
  searchText=""
  showFilterModel=false
  totalItems: number = 1;
  users={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }
  indexes={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
    }
  filterForm
  isSkeletonVisible = true;
  constructor(private headerService: HeaderService, private translate: TranslateService, private router: Router, private userInformation: UserService,private fb:FormBuilder,private sharedService: SharedService,
    public translationService: TranslationService) {}
  users_List: IAccount[] = [];


  ngOnInit(): void {
    console.log(this.translationService.lang);
    this.getRoleList();
    this.initForm();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
          // { label: this.translate.instant('dashboard.UserInformation.List Of Users') }
        ],
      }
    );
    this.cities = this.userInformation.cities;
    this.getUsersList();
  }
  getUsersList(search = '', sortby = '', pageNum = 1, pageSize = 100){
    this.isSkeletonVisible = true;
    this.indexes.loading=true
    this.userInformation.getUsersList(search, sortby, pageNum, pageSize).subscribe(response => {
      this.users_List = response?.data;
      this.indexes.totalAllData = response.total
      this.totalItems =response.total;
      this.indexes.loading = false;
      this.isLoaded = true;

    },err=> {
      this.indexes.loading=false
      this.indexes.total=0;
    })
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }

  initForm(){
    this.filterForm= this.fb.group(()=>{
      let formGroup={}
      this.formControls.forEach(item =>{

        formGroup[item] =[]
      })
      return formGroup
    })

    // let formGroup={}
    // this.formControls.forEach(item =>{

    //   formGroup[item] =[]
    // })
    // console.log(formGroup);
    // return formGroup
  }


  submitForm(){
    this.showFilterModel = false
  }

  clearForm(){
    this.showFilterModel = false

  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {

    let searchData = this.searchKey.trim().toLowerCase();
    this.getUsersList(searchData, '', 1, 500);
  }
  getRoleList(){
    this.userInformation.GetRoleList().subscribe(response => {
      debugger;
      console.log(response)
		  this.roles = response;
		})
  }
  listOfRoles : IRole[] = [];
  selectedItems:IRole;
  listOfName : Array<string> ;
  onChange(event: any ) {
    this.selectedRole = event.value;
}
clearFilter(){
  this.selectedRole = null;
  this.isactive = null ;
  this.showFilterModel = false;
  this.getUsersList();
}

onFilterActivated(){
  let isUserActive :boolean;
  if (this.isactive == 'Active') {
    isUserActive = true;
  } else if (this.isactive == 'Inactive') {
    isUserActive = false;
  }
  debugger

  this.userInformation.getUsersListByRoled(
    this.selectedRole==undefined ? null :  this.selectedRole.id ,isUserActive == undefined ? null : isUserActive ,
    '','',1,100).subscribe(response => {
    console.log(response)
    this.users_List = response?.data;
    this.isLoaded = true;
    console.log(  this.users_List );
  })
  this.showFilterModel=!this.showFilterModel

}

}
