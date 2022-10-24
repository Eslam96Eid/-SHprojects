import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { from, map, of, share, shareReplay, take } from 'rxjs';
import { Curriculum, Division, Grade, Track } from 'src/app/core/models/global/global.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { StatusEnum } from '../../enums/status/status.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  allDivisions:Division[]
  allCurriculum: Curriculum[]
  allGrades: Grade[]
  allTraks: Track[]
  allOptionalSubjects


  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true}, 
    {name: this.translate.instant('shared.no'), value:false}
  ]

  statusOptions =[
    {name: this.translate.instant('shared.allStatus.'+StatusEnum.Active) , value:StatusEnum.Active}, 
    {name: this.translate.instant('shared.allStatus.'+ StatusEnum.Inactive), value:StatusEnum.Inactive}
  ]

  
  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
  ) { }

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

  getAllOptionalSubjects(){
    return this.http.get('/Subject/elective-subjects').pipe(take(1))
  }

}
