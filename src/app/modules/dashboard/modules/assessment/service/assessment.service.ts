import { Injectable } from '@angular/core';
import { finalize, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

import { IRate } from '../components/edit-new-assessment/edit-new-assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private tableLoaderService: LoaderService,private http: HttpHandlerService) {}

  getRates(filter?:Partial<Filter>) {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/Rate',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  // getRates(): Observable<any> {
  //   return this.http.get('/Rate');
  // }

  addRate(data: IRate): Observable<any> {
    return this.http.post('/Rate', data);
  }

  updateRate(data: IRate): Observable<any> {
    return this.http.put('/Rate', data);
  }

  getRateById(id: number): Observable<any> {
    return this.http.get(`/Rate/${id}`, {}, {

    });
  }

}
