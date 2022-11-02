import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';

import { FormBuilder } from '@angular/forms';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { IRole } from 'src/app/core/Models/IRole';
import { IAccount } from 'src/app/core/Models/IAccount';



@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  @Input('hasFilter') hasFilter:boolean=true;
  roles: IRole[] = [];
  isLoaded = false;
  searchKey: string = '';
  first = 0;
  rows = 6;
  usersList: IUser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  @Input('filterFormControls') formControls:string[] =[]

  showFilterBox = false
  searchText=""
  showFilterModel=false
  users={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }
  filterForm
  isSkeletonVisible = true;
  constructor(private headerService: HeaderService, private translate: TranslateService, private router: Router, private userInformation: UserService,private fb:FormBuilder) {}
  users_List: IAccount[] = [];


  ngOnInit(): void {
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
    this.usersList = this.userInformation.usersList;
    this.getUsersList();
  }
  getUsersList(search = '', sortby = '', pageNum = 1, pageSize = 100){
    this.userInformation.getUsersList(search, sortby, pageNum, pageSize).subscribe(response => {
      this.users_List = response?.data;
      this.isLoaded = true;
      this.isSkeletonVisible = false;

    },err=> {
      this.isSkeletonVisible=false;
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
    this.getUsersList(searchData, '', 1, 50);
  }
  getRoleList(){
    this.userInformation.GetRoleList().subscribe(response => {
		  this.roles = response;
		})
  }
  listOfRoles : IRole[] = [];
  selectedItems:IRole;
  listOfName : Array<string> ;
  onChange(event: any ) {
    this.listOfName = [];
    this.listOfName.push( event.value.name);
}
clearFilter(){
  this.selectedItems = null;
  this.showFilterModel = false;
  this.getUsersList();
}

onFilterActivated(){
  debugger;
  this.userInformation.getUsersListByRoled(this.selectedItems.id , true,'','',1,100).subscribe(response => {
    this.users_List = response?.data;
    this.isLoaded = true;
    console.log(  this.users_List );
  })
  this.showFilterModel=!this.showFilterModel

}

}
