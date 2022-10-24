import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

import { IRate } from '../components/edit-new-assessment/edit-new-assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpHandlerService) {}

  getRates(): Observable<any> {
    return this.http.get('/Rate');
  }

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
