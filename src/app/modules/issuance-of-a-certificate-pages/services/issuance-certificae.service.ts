import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IssuanceCertificaeService {

  constructor(private http:HttpHandlerService) { }


  getParentsChild(){
   return this.http.get('/Guardian/2/Children?yearId=1')
  }
}
