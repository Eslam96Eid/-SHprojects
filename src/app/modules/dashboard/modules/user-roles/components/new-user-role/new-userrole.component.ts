import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IUserRoles } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { UserRolesService } from '../../service/user-roles.service';

@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-userrole.component.html',
  styleUrls: ['./new-userrole.component.scss']
})
export class NewUserRoleComponent implements OnInit {
  jobRole:IUserRoles={} as IUserRoles;
  userRolesList:IUserRoles[] = [];
  rolePowersList;
  datarestrictionLevelList;
  isShown:boolean=false;
  notChecked:boolean=false;
  checked:boolean=true;
  checkIcon = faCheck;
  message:string="";
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  roleFormGrp: FormGroup;
  urlParameter: string='';
  constructor(private fb: FormBuilder, private toastr:ToastrService,private route: ActivatedRoute, private userRolesService: UserRolesService,private layoutService:LayoutService,  private translate: TranslateService, private headerService: HeaderService) {
    this.roleFormGrp = fb.group({

      jobRoleName: ['', [Validators.required, Validators.maxLength(65)]],
      description: ['', [Validators.maxLength(256)]],
      rolePowers: ['', [Validators.required]],
      datarestrictionLevel: [''],
      status: ['']


    });
  }

  ngOnInit(): void {
    this.userRolesService.userRolesList.subscribe((res)=>{this.userRolesList=res;});
    this.rolePowersList=this.userRolesService.rolePowersList;
    this.route.paramMap.subscribe(param => {
      this.urlParameter =param.get('roleId');
      this.userRolesList.forEach(element => {
        if(this.urlParameter!=null&&Number(this.urlParameter)==element.id)
        { 
          
          this.jobRole=element;
          this.bindOldRole(this.jobRole);
        }
    
        });
    });
    console.log("param"+this.urlParameter);
    
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/user-roles/user-roles-list',routerLinkActiveOptions:{exact: true} },
          { 
           
            label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('breadcrumb.Add Roles in The System'):this.translate.instant('breadcrumb.Edit Role'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/manager-tools/user-roles/new-role':'/dashboard/manager-tools/user-roles/edit-role/'+this.urlParameter
          }
       ],
        'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('breadcrumb.Add Roles in The System'):this.translate.instant('breadcrumb.Edit Role')}
      }
      
    );
    this.datarestrictionLevelList = this.userRolesService.datarestrictionLevelList;
  }
  get jobRoleName() {
    return this.roleFormGrp.controls['jobRoleName'] as FormControl;
  }

  get description() {
    return this.roleFormGrp.controls['description'] as FormControl;
  }

  get rolePowers() {
    return this.roleFormGrp.controls['rolePowers'] as FormControl;
  }

  get status() {
    return this.roleFormGrp.controls['status'] as FormControl;
  }

  get datarestrictionLevel() {
    return this.roleFormGrp.controls['datarestrictionLevel'] as FormControl;
  }


  succeeded(){
    
  // if duplicated
  // this.toastr.clear();
  // this.layoutService.message.next( 'dashboard.UserRole.JobRole already exist ,Pleaze change JobRole and try again');
  //   this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
  //   this.toastr.error( this.translate.instant(this. message));
 

  //if added
  console.log(this.jobRole.rolePowers)
  this.toastr.clear();
  this.layoutService.message.next('dashboard.UserRole.JobRole added Successfully');
  this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
  this.toastr.success( this.translate.instant(this. message));
 
  }
  isToggleLabel(e)
  {
    if(e.checked)
    {
      if(this.urlParameter)
      {
        this.jobRole.status="فعال";
      
      }
      else
      {
        this.isShown=true;
      }
  
    }
    else{
      if(this.urlParameter)
      {
        this.jobRole.status="غير فعال";
     
      }
      else
      {
        this.isShown=false;
      }
     
    }
  }

  bindOldRole(role)
  {
    console.log(role);
       role.indexStatus=role.status=="فعال"||role.status=="1"?this.checked:this.notChecked;
        this.roleFormGrp.patchValue({jobRoleName:role.jobRoleName, 
          description:role.description,
          rolePowers:role.rolePowers,
          datarestrictionLevel:role.dataRestrictionLevel,
          status:role.indexStatus,
        });
    
        console.log( this.roleFormGrp.value); 
  }
  


}
