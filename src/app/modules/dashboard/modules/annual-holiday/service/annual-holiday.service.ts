import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {take,  delay,BehaviorSubject,finalize } from 'rxjs';
import { IAnnualHoliday } from 'src/app/core/Models/annual-holidays/annual-holiday';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/app/core/Models/filter/filter';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AnnualHolidayService {
  openModel = new BehaviorSubject(false);
  schoolYear: number = 0;
  holidayStatusList;
  yearList;
  cities: string[];
  // annualHolidayList: IAnnualHoliday[] = [];
  public holidayList= new BehaviorSubject<[]>([]);
  public holiday= new BehaviorSubject<{}>({});
  public editedHoliday= new BehaviorSubject<{}>(null);
  public annualCalendarName= new BehaviorSubject<string>("");
  public year= new BehaviorSubject<string>("");
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {

    // this.annualHolidayList = [
    //   { 'id': 1, 'annualCalendarName': "الاجازات السنوية لعام 2023 - 2022",'year': "2022",'holidayList':
    //   [{ 'id': 1, 'arabicName':'الأجازة السنوية','dateTo':'23/08','dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' },
    //   {  'id': 2,'arabicName':'الأجازة الصيفية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}], 'createdDate': '4/07/2022' },
    //   { 'id': 3,'arabicName':'أجازة عيد الأم','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' }] 
    //   },

    //   { 'id': 2, 'annualCalendarName': "الاجازات السنوية لعام 2023 - 2022" ,'year': "2022",'holidayList':
    //   [{ 'id': 1, 'arabicName':'الأجازة السنوية','dateTo':'23/08','dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' },
    //   { 'id': 2, 'arabicName':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}], 'createdDate': '4/07/2022' },
    //   {'id': 3, 'arabicName':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' }]  },

    //   { 'id': 3, 'annualCalendarName': "الاجازات السنوية لعام 2023 - 2022" ,'year': "2022",'holidayList':
    //   [{ 'id': 1, 'arabicName':'الأجازة السنوية','dateTo':'23/08','dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' },
    //   { 'id': 2, 'arabicName':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}], 'createdDate': '4/07/2022' },
    //   { 'id': 3,'arabicName':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' }]  },

    //   { 'id': 4, 'annualCalendarName': "الاجازات السنوية لعام 2023 - 2022" ,'year': "2022",'holidayList':
    //   [{  'id': 1,'arabicName':'الأجازة السنوية','dateTo':'23/08','dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' },
    //   {  'id': 2,'arabicName':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}], 'createdDate': '4/07/2022' },
    //   { 'id': 3,'arabicName':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculumName':[{id:1,name:'الأسترالي'},{id:1,name:'البريطاني'},{id:1,name:'الفلبينى'}],  'createdDate': '4/07/2022' }]  }

    // ];
  
    this.holidayStatusList=[
      {id:0,name:{'ar':this.translate.instant("shared.allStatus.Flexible"),'en':'Flexible'}},
      {id:1,name:{'ar':this.translate.instant("shared.allStatus.NotFlexible"),'en':'NotFlexible'}}
    ];
    this.yearList=[
      {'id':1,'year':this.translate.instant("2022")},
      {'id':2,'year':this.translate.instant("2023")},
      {'id':3,'year':this.translate.instant("2024")},
      {'id':4,'year':this.translate.instant("2025")},
      {'id':5,'year':this.translate.instant("2026")},
      {'id':6,'year':this.translate.instant("2027")},
      {'id':7,'year':this.translate.instant("2028")},
      {'id':8,'year':this.translate.instant("2029")},
      {'id':9,'year':this.translate.instant("2030")},
      {'id':10,'year':this.translate.instant("2031")},
      {'id':11,'year':this.translate.instant("2032")},
      {'id':12,'year':this.translate.instant("2033")},
      {'id':13,'year':this.translate.instant("2034")},
      {'id':14,'year':this.translate.instant("2035")},
      {'id':15,'year':this.translate.instant("2036")},
      {'id':16,'year':this.translate.instant("2037")},
      {'id':17,'year':this.translate.instant("2038")},
      {'id':18,'year':this.translate.instant("2039")},
      {'id':19,'year':this.translate.instant("2040")},
      {'id':20,'year':this.translate.instant("2041")},
    ];
  }

  getAllHolidays(filter:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.get('/Holiday/holiday/annual',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
    
  }
  addAnnualHoliday(holiday)
  {
    console.log(holiday);
    return this.http.post('/Holiday/holiday/annual',holiday);
    
      
  }
  updateAnnualHoliday(holidayId:number,holiday)
  {
    console.log("service")
    return this.http.put(`/Holiday/holiday/annual/${holidayId}`,holiday).pipe(take(1))
  }

  getAllcurriculumName()
  {
    return this.http.get('/Curriculum').pipe(take(1));
    
  }

  getAllYears()
  {
    return this.http.get('/Holiday/calender-year').pipe(take(1));
    
  }
 

 
}
