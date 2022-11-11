import { Injectable } from '@angular/core';
import { finalize, take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http:HttpHandlerService, private tableLoaderService:LoaderService) { }

  getSchoolGardes(schoolId, filter = {}){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/School/${schoolId}/grade`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getGrade(schoolId, id){
    this.http.get(`${id}`,)
  }

  editGrade(schoolId, classId, classData){
    this.http.post(`${classId}`,classData)
  }


  getGradeDivision(schoolId, gradeId){
    return this.http.get(`/Division/school/${schoolId}/grade/${gradeId}`).pipe(take(1))
  }


  getGradeTracks(schoolId,gradeId){

    return this.http.get(`/School/${schoolId}/grade/${gradeId}/tracks`).pipe(take(1))
  }


}
