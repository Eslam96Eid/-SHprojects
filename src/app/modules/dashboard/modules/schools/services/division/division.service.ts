import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOL DIVISIONS >> //
  getSchoolDivisions(schoolId, filter={}){
    return this.http.get(`/School/${schoolId}/division`,filter).pipe(take(1))
  }

  getDivision(schoolId, id){
    this.http.get(`${id}`,).pipe(take(1))
  }

  editDivision(schoolId, divisionId, divisionData){
    this.http.post(`${divisionId}`,divisionData).pipe(take(1))
  }



  // << Division STUDENTS >> //
  getDivisionStudents(schoolId, divisionId,filter){
    this.http.get(`${schoolId}`,filter).pipe(take(1))
  }

  getDivisionTracks(schoolId,gardeId, divisionId){
    // return this.http.get(`/SchoolTrack/school-tracks/${divisionId}`).pipe(take(1))
    // return this.http.get(`/Track/${divisionId}/division-tracks`).pipe(take(1))
    return this.http.get(`/School/${schoolId}/grade/${gardeId}/division/${divisionId}`).pipe(take(1))
  
  }
  
  addStudentsTodivision(schoolId, divisionId, students){
    this.http.post(`${schoolId}`,students).pipe(take(1))
  }


  transferStudentToAnotherDivision(data){
    return this.http.put('/Division/transfer/student', data).pipe(take(1))
  }

  // << ABSENCE RECORDS >> //
  getAbsenceRecords(schoolId, TrackId){
    this.http.get(`${schoolId}`).pipe(take(1))

  }

  addAbsentStudents(schoolId, TrackId, students){
    this.http.post(`${TrackId}`,students).pipe(take(1))

  }

  deleteAbsentStudent(id){
    this.http.delete(`${id}`).pipe(take(1))
  }

}
