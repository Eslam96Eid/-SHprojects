import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, from, map, of, share, shareReplay, take } from 'rxjs';
import { Curriculum, Division, Grade, shool_DDL, Track } from 'src/app/core/models/global/global.model';
import { School } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { GenderEnum, ReligionEnum } from '../../enums/global/global.enum';
import { StatusEnum } from '../../enums/status/status.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  allDivisions:Division[]
  allCurriculum: Curriculum[]
  allSchools: shool_DDL[]
  
  allGrades: Grade[]
  allTraks: Track[]
  allOptionalSubjects
  public scope= new BehaviorSubject<string>("");


  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true},
    {name: this.translate.instant('shared.no'), value:false}
  ]

  statusOptions =[
    {name: this.translate.instant('shared.allStatus.'+StatusEnum.Active) , value:StatusEnum.Active},
    {name: this.translate.instant('shared.allStatus.'+ StatusEnum.Inactive), value:StatusEnum.Inactive}
  ]

  genderOptions =[
    {name: this.translate.instant('shared.genderType.'+ GenderEnum.Male), value:GenderEnum.Male},
    {name: this.translate.instant('shared.genderType.'+GenderEnum.Female) , value:GenderEnum.Female},
  ]

  religions=[
    {name: this.translate.instant('shared.'+ ReligionEnum.Muslim), value:ReligionEnum.Muslim},
    {name: this.translate.instant('shared.'+ReligionEnum.UnMuslim) , value:ReligionEnum.UnMuslim}, 
  ]

  
  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
  ) {
    this.scope.next('')
  }

  getAllCurriculum(){
    if(this.allCurriculum) return of(this.allCurriculum)
    return this.http.get('/Curriculum')
    .pipe(
      take(1),
      map((res)=> {
        this.allCurriculum = res.data
        return res.data
      }))
  }

  getAllDivisions(){
    if(this.allDivisions) return of(this.allDivisions)
    return this.http.get(`/Division`).pipe(take(1),map(val => {
       this.allDivisions = val.data
       return val.data
    }))
  }

  getAllGrades(){
    if(this.allGrades) return of(this.allGrades)
    return this.http.get(`/Grade`).pipe(take(1),map(val => {
      this.allGrades = val.data
      return val.data
    }))
  }

  getAllTraks(){
    if(this.allTraks) return of(this.allTraks)
    return this.http.get(`/Track`).pipe(take(1),map(val => {
      this.allTraks = val.data
      return val.data
    }))
  }

  getAllOptionalSubjects(params){
    return this.http.get('/Subject/elective-subjects',params).pipe(take(1))
  }
  getSchoolsByCurriculumId(curriculumId){
    return this.http.get('/School/dropdowen?curriculumId='+curriculumId)
    .pipe(
      take(1),
      map((res)=> {
        debugger;
        console.log(res)
        this.allSchools = res
        return res
      }))
  }
}
