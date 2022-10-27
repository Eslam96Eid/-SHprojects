import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


import { IuploadAssignment } from '../../assignments/assignments/model/IuploadAssignment';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private http: HttpHandlerService,private _http: HttpClient) {
    // this.headers = this.headers.set('content-type', 'application/json');
    // this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.append('Content-Type', 'multipart/form-data');
    this.headers = this.headers.append('enctype', 'multipart/form-data');
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
    debugger
    let params = new HttpParams();
    if(curriculumId !== null && curriculumId !== undefined ){
      params = params.append('curriculumId' , curriculumId.toString());
      return this.http.get(`${this.baseUrl+'/School'}`, {observe:'response' , params}).pipe(
        map(response => {
           return response.body ;
        })
      )
    }else{
      return this.http.get(`${this.baseUrl+'/School'}`, {observe:'response'}).pipe(
        map(response => {
           return response.body ;
        })
      )
    }

  }

  GetGradeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/Grade`);
  }

  GetSubjectList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/Subject`);
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
    let body= {keyword:keyword.toString() ,sortBy: sortby.toString() ,page:Number(page) , pageSize:Number(pagesize)}
    return this.http.get(`${this.baseUrl+'/Exam'}`,body).pipe(
      map(response => {
        console.log(response);
         return response ;
      })
    )
  }
  AddAssignment(data: IuploadAssignment): Observable<any> {
    return this.http.post(`${this.baseUrl}/Exam`, data);
  }
  _headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',
});
public onFileUpload(_file : any ): Observable<any>{
  return this._http.post<any>(this.baseUrl + '/Upload/Upload-blobstorage?type=exam',_file,{headers:this._headers});
}
}
