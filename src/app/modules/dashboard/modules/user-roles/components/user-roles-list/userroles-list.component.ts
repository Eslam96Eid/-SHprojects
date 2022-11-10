import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical,faClose } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserRolesListComponent implements OnInit,OnDestroy {
  faEllipsisVertical = faEllipsisVertical;
  userListForSpecificRole:string[]=[];
  showLoader:boolean=false;
  displayUserList: boolean;
  roleStatusList;
  selectedRole;
  subscription:Subscription;
  filtration = {...Filtration,isactive:null};
  paginationState= {...paginationInitialState};
  roles={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(private exportService: ExportService, public confirmModelService: ConfirmModelService,private toastService: ToastService,private confirmationService: ConfirmationService,private headerService: HeaderService,  private userRolesService: UserRolesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.showLoader=true;
    this.confirmDeleteListener();
    this.getAllRole();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'),routerLink:'/dashboard/manager-tools/user-roles/user-roles-list'}],
      }
    );
   
    this.roleStatusList = this.userRolesService.roleStatusList;
 
  }
  confirmDeleteListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteRole(this.selectedRole)
      
    })
  }


  deleteRole(role)
  { 

  
        this.userRolesService.deleteRole(role.id).subscribe((res)=>{
       
          this.getAllRole();
          this.toastService.success(this.translate.instant('dashboard.UserRole.Job Role deleted Successfully'));
          this.confirmModelService.confirmed$.next(null);
          },(err)=>{
         
            this.getAllRole();
            this.toastService.error(this.translate.instant('dashboard.UserRole.error,please try again'));
            this.confirmModelService.confirmed$.next(null);

          });
        
 }

  getAllRole()
  {
    this.roles.loading=true;
    this.roles.list=[];
    this.userRolesService.getAllRoles(this.filtration).subscribe((res)=>{
      this.roles.loading = false;
      this.roles.list=res.data;
      this.roles.totalAllData = res.totalAllData;
      this.roles.total=res.total;
 console.log(this.roles.list)
      },(err)=>{this.roles.loading = false;
        this.roles.total=0
      });

  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.isactive= null;
    this.getAllRole();
  }
  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="update"+e.field;}
    else
    {this.filtration.SortBy="old"+e.field;}

    this.getAllRole();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.roles.list)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllRole();

  }
  showUserList(roleId:number) {
   

    this.userRolesService.getRoleByID(roleId).subscribe((res)=>{
      this.showLoader=false;
      this.userListForSpecificRole=res.users;
    });
     this.displayUserList = true;
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}



}
