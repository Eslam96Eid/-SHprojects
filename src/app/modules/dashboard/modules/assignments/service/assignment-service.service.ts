import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { IuploadAssignment } from '../../../../../core/Models/IuploadAssignment';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private _http: HttpClient,private http: HttpHandlerService) {


  }

  GetCurriculumList(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
    let params = new HttpParams();
    if(page !== null && pagesize !== null ){
      params = params.append('keyword' , keyword.toString());
      params = params.append('sortby' , sortby.toString());
      params = params.append('page' , page.toString());
      params = params.append('pagesize' , pagesize.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortdirection' , sortdirection.toString());
    }
    return this.http.get(`${this.baseUrl+'/Curriculum'}`,params).pipe(
      map(response => {
         return response ;
      })
    )
  }

  GetSchoolsList(curriculumId:number) {
    
    let params = new HttpParams();
    if(curriculumId !== null && curriculumId !== undefined ){
      params = params.append('curriculumId' , curriculumId.toString());
      return this._http.get<any>(`${this.baseUrl}`+'/School', {observe:'response' , params}).pipe(
        map(response => {
           return response.body ;
        })
      )
    }else{
      return this._http.get<any>(`${this.baseUrl+'/School'}`, {observe:'response'}).pipe(
        map(response => {
           return response.body ;
        })
      )
    }

  }

  GetGradeList(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}` + `/Grade`);
  }

  GetSubjectList(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}` + `/Subject`);
  }

  getAssignmentList(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
    let params = new HttpParams();
    if(page !== null && pagesize !== null ){
      params = params.append('keyword' , keyword.toString());
      params = params.append('sortby' , sortby.toString());
      params = params.append('page' , page.toString());
      params = params.append('pagesize' , pagesize.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortdirection' , sortdirection.toString());
    }
    return this._http.get<any>(`${this.baseUrl}`+'/Exam', {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }
  AddAssignment(data: IuploadAssignment): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}`+'/Exam', data);
  }
  _headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',

});
  public onFileUpload(_file : any ): Observable<any>{
    return this._http.post<any>(this.baseUrl + '/Upload/Upload-blobstorage?type=exam',_file,{headers:this._headers});
  }
}
