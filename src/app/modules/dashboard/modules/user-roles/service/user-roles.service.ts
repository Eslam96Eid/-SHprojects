import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { take,BehaviorSubject,finalize } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { IRestrictionSchool } from 'src/app/core/Models/user-roles/restriction-school';


@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  roleStatusList;
  dataRestrictionLevelList;
  public userTittle= new BehaviorSubject<string>("");
  public schoolSelectedList= new BehaviorSubject<IRestrictionSchool[]>([]);
  public MarkedListLength= new BehaviorSubject<number>(0);
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this. roleStatusList=[
      {'id':1,'name':{'ar':this.translate.instant("Active"),'en':true}},
      {'id':2,'name':{'ar':this.translate.instant("Inactive"),'en':false}}
    ];
    this.dataRestrictionLevelList=[
      {
        "id": 1,
        "name": {
            "en": "AccessToAllSchoolInformation",
            "ar": this.translate.instant('dashboard.UserRole.AccessToAllSchoolInformation')
        }
      },
      {
        "id": 2,
        "name": {
            "en": "AccessToInformationRelatedToCurriculums",
            "ar": this.translate.instant('dashboard.UserRole.AccessToInformationRelatedToCurriculums')
        }
      },
      {
        "id": 3,
        "name": {
            "en": "AccessToInformationRelatedToSchool",
            "ar": this.translate.instant('dashboard.UserRole.AccessToInformationRelatedToSchool')
        }
      }
    ];
  }


  getAllRoles(filter?:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.post('/role-details',{},filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));

  }



  addRole(role)
  {
    console.log(role);
    return this.http.post('/role-details/add',role);


  }

  getRoleByID(roleId:number)
  {
    return this.http.get(`/role-details/${roleId}`).pipe(take(1))
  }

  updateRole(role,roleId)
  {

    return this.http.put(`/role-details/update/${roleId}`,role).pipe(take(1))
  }

  deleteRole(roleId:number)
  {
    console.log(roleId);
    return this.http.delete(`/role-details/${roleId}`).pipe(take(1));

  }

   getAllClaims()
   {
    return this.http.get(`/clams/dropdown`).pipe(take(1))
   }


   getAllcurriculumName()
   {
     return this.http.get('/curriculum').pipe(take(1));

   }


}
