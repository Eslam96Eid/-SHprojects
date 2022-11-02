import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type theme = 'light' | 'dark';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // light or dark
   bgColor$ = new BehaviorSubject<theme>('light')

  constructor(private httpClient:HttpClient) { }

  getuserlist(){
    return this.httpClient.get<any>('../../../modules/dashboard/modules/surveys/components/send-survey/userlist.json')
  }
  changeTheme(theme :theme){
    this.bgColor$.next(theme)
  }

  getCountries() {
    return this.httpClient.get<any>('modules/surveys/components/send-survey/userlist.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
    }
}
