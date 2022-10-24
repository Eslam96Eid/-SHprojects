import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = this.headers.set('content-type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
   }

  getAllParents(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
    let params = new HttpParams();
    if(page !== null && pagesize !== null ){
      params = params.append('keyword' , keyword.toString());
      params = params.append('sortby' , sortby.toString());
      params = params.append('page' , page.toString());
      params = params.append('pagesize' , pagesize.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortdirection' , sortdirection.toString());
    }
    return this.http.get<any>(`${this.baseUrl+'/Guardian'}`, {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }



  getChildernByParentId(id:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl+'/Guardian/'+id+'/Children'}`);
  }

}
