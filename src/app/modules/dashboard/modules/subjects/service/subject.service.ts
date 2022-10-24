import { Injectable } from '@angular/core';
import { ISubject } from 'src/app/core/Models/isubject';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { take,  delay,BehaviorSubject,finalize } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjectsList: ISubject[] = [];
 evaluationTypeList;
  cities: string[];
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this.evaluationTypeList=
    [{id:1,name:{en:"IPpoints",ar:this.translate.instant('IPpoints')}},
    {id:2,name:{en:"Grades",ar:this.translate.instant('dashboard.Subjects.Grades')}},
    {id:3,name:{en:"Discription",ar:this.translate.instant('dashboard.Subjects.Discription')}},
    {id:4,name:{en:"Evaluation",ar:this.translate.instant('dashboard.Subjects.Evaluation')}}];
    this.cities = [
      "2022",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];
  }

  getAllSubjects(filter?:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.get('/Subject',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
  }
  deleteSubject(id:number)
  {
    console.log(id);
    return this.http.delete(`/Subject/${id}`).pipe(take(1));
   
  }
}
