import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical,faClose } from '@fortawesome/free-solid-svg-icons';

import {ConfirmationService, MessageService} from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';

import { IUserRoles } from 'src/app/core/Models/iuser-role';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserRolesListComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  userListForSpecificRole:string[]=[];
  first = 0;
  rows = 4;
  message:string="";
  displayUserList: boolean;
  userRolesList:IUserRoles[] = [];
  displayPosition: boolean;
  position: string;
  cities: string[];
  constructor(private userInformation: UserService,private toastr:ToastrService,private confirmationService: ConfirmationService,private headerService: HeaderService, private layoutService:LayoutService, private userRolesService: UserRolesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {


    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'),routerLink:'/dashboard/manager-tools/user-roles/user-roles-list'}],
      }
    );
    this.cities = this.userRolesService.cities;
    this.userRolesService.userRolesList.subscribe((res)=>{this. userRolesList=res;});
    // this. userRolesList=[]
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  gotoAddRole() {
    this.router.navigate(['/dashboard/manager-tools/user-roles/new-role']);
  }
  deleteRole(item:IUserRoles)
  { 
    this.confirmationService.confirm({
      message: this.translate.instant('dashboard.UserRole.Are you sure that you want to delete JobRole')+" \" "+item.jobRoleName+" \" "+this.translate.instant('shared.?'),
      header: this.translate.instant('shared.Delete Confirmation'),
      icon: 'pi pi-exclamation-circle',
      accept:() => { 
        this.userRolesList.forEach(element => {
          if(element.roleUsers>0&&element.id==item.id)
          {
            this.toastr.clear();
            this.layoutService.message.next( 'dashboard.UserRole.error, you can’t delete this JobRole');
            this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
            this.toastr.error( this.translate.instant(this. message));
           
          }
          else if(element.roleUsers==0&&element.id==item.id)
          {
           
            this.toastr.clear();
            this.layoutService.message.next('dashboard.UserRole.Job Role deleted Successfully');
            this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
            this.toastr.success( this.translate.instant(this. message));
       
          }
          
        });
  
      
      }
   
    });
  
   
    
  }
  showUserList(userRole:string) {
    this.userRolesService.userListForSpecificRoleApi=[];
    this.userInformation.usersList.forEach(element => {
      if(element.privateRole==userRole)
      {
        this.userRolesService.userListForSpecificRoleApi.push(element.fullName);
      }
    });

    this.userRolesService.userListForSpecificRole.next(this.userRolesService.userListForSpecificRoleApi);
    this.userRolesService.userListForSpecificRole.subscribe((res)=>{this.userListForSpecificRole=res;});
    this.displayUserList = true;
}

 



}
