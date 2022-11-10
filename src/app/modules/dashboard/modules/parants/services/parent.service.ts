import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private http: HttpHandlerService,
    private tableLoaderService: LoaderService) {
    this.headers = this.headers.set('content-type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
   }

  getAllParents(filter?:Partial<Filter>) {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/Guardian',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }



  getChildernByParentId(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl+'/Guardian/'+id+'/Children?yearId=1'}`);
  }

  getUnregisterChildern(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl+'/Child/'+id}`);
  }
}
