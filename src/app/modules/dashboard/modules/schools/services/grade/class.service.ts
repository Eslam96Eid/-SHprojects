import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http:HttpHandlerService) { }

  getSchoolGardes(schoolId, filter = {}){
    return this.http.get(`/School/${schoolId}/grade`,filter).pipe(take(1))
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


  getGradeTracks(schoolId){
    return this.http.get(`/SchoolTrack/school-tracks/${schoolId}`).pipe(take(1))
  }


}
