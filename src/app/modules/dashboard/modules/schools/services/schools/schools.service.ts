import { Injectable } from '@angular/core';
import { delay, finalize, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { School } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ISchoolChart } from '../../components/school-list/school-charts/school-chart.models';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http:HttpHandlerService, private tableLoaderService: LoaderService) { }

  // << SCHOOLS >>
  getAllSchools(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/School',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getSchool(schoolId): Observable<School>{
    return this.http.get(`/School/${schoolId}`,).pipe(take(1))
  }

  getSchoolGardes(schoolId, filter = {}){
    return this.http.get(`/School/${schoolId}/grade`,filter).pipe(take(1))
  }

  getSchoolDivisions(schoolId, filter={}){
    return this.http.get(`/School/${schoolId}/division`,filter).pipe(take(1))
  }

  getSchoolsTracks(schoolId){
    return this.http.get(`/SchoolTrack/school-tracks/${schoolId}`).pipe(take(1))
  }
  
  
  getCharts(): Observable<ISchoolChart> {
    // TODO => Need to implement interceptor
    return this.http.get('/School/Statistics', {}, {

    });
  }


  getSchoolAnnualHolidays(schoolId, filter:Filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Holiday/holiday/annual/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  updateFlexableHoliday(holidayId, data){
    return this.http.post(`/Holiday/holiday/flexible/request/${holidayId}`,data).pipe(take(1))
  }

  updateSchoolLogo(schoolId, data){
    return this.http.post(`/School/school-logo`,data, {schoolId})
  }

  updateSchoolDiplomaLogo(schoolId, data){
    return this.http.post(`/School/diploma-logo`,data, {schoolId})
  }


  // << SCHOOL EMPLOYEE >>
  getSchoolEmployees(schoolId, filter:Filter){
    return this.http.get(`/School/${schoolId}/SchoolEmployee`, filter)
  }

  editEmpoyee(id, employeeData){
    this.http.post(`${id}`,employeeData)

  }


  // << SCHOOL SUBJECTS >>

  getSchoolSubjects( filter){
    return this.http.get(`/School/Subject`,filter)
  }

  // << SCHOOL EDIT LIST>>

}
