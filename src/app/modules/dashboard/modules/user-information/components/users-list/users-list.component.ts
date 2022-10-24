import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';

import { FormBuilder } from '@angular/forms';
import { IAccount } from '../../models/IAccount';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';


@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  isLoaded = false;
  searchKey: string = '';
  first = 0;
  rows = 4;
  usersList: IUser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  @Input('filterFormControls') formControls:string[] =[]

  showFilterBox = false
  searchText=""

  showFilterModel=false

  filterForm

  constructor(private headerService: HeaderService, private translate: TranslateService, private router: Router, private userInformation: UserService,private fb:FormBuilder) { }
  users_List: IAccount[] = [];

  getUsersList(search = '', sortby = '', pageNum = 1, pageSize = 100){
    this.userInformation.getUsersList(search, sortby, pageNum, pageSize).subscribe(response => {
      this.users_List = response?.data;
      this.isLoaded = true;
      console.log(  this.users_List )
    })
  }
  ngOnInit(): void {
    this.initForm()

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
    debugger
    let searchData = this.searchKey.trim().toLowerCase();
    this.getUsersList(searchData, '', 1, 50);
  }
}
