import { Injectable } from '@angular/core';
import { take,finalize } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  indexStatusList;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
  
    this.indexStatusList=[
      {'id':1,'arabicName':this.translate.instant("Active")},
      {'id':2,'arabicName':this.translate.instant("Inactive")}
    ];
  }


  getAllIndexes(filter?:Partial<Filter>)
  { 
    this.loaderService.isLoading$.next(true);
    return this.http.get('/IndexList',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
    
  }

  getIndextTypeList()
  { 
   
    return this.http.get('/IndexList/indexTypes').pipe(take(1));

  }
    
 

  addIndex(index)
  {
    console.log(index);
    return this.http.post('/IndexList',index);
    
      
  }
 
  getIndexByID(indexId:number)
  {
    return this.http.get(`/IndexList/${indexId}`).pipe(take(1))
  }

  updateIndex(indexId:number,index)
  {
 
    return this.http.put(`/IndexList/${indexId}`,index).pipe(take(1))
  }
    
    
  
}
