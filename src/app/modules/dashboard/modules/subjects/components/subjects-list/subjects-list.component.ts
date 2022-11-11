import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SubjectService } from '../../service/subject.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { Table } from 'primeng/table';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SubjectsComponent implements OnInit,OnDestroy {
  faEllipsisVertical = faEllipsisVertical;
  evaluationTypeList;
  deletedSubject;
  subscription:Subscription;
  filtration = {...Filtration,evaluation: ''};
  paginationState= {...paginationInitialState};
  subjects={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  constructor(private exportService: ExportService, public confirmModelService: ConfirmModelService, private toastService: ToastService, private headerService: HeaderService, private router: Router, private translate: TranslateService, private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.confirmDeleteListener();
    this.getAllSubjects();
    this.evaluationTypeList=this.subjectService.evaluationTypeList;
    console.log(...this.evaluationTypeList);
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'),routerLink: '/dashboard/educational-settings/subject/subjects-list'}],
      }
    );
 
   

  }
  sortMe(e)
  {
    
    console.log(e);
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}

    this.getAllSubjects();
  }
  confirmDeleteListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteSubject(this.deletedSubject)
      
    })
  }

  getAllSubjects(){
    this.subjects.loading=true;
    this.subjects.list=[];
    this.subjectService.getAllSubjects(this.filtration).subscribe((res)=>{
        this.subjects.loading = false;
        this.subjects.total=res.total;
        this.subjects.totalAllData = res.totalAllData;
        this.subjects.list=res.data;

      },(err)=>{
        this.subjects.loading = false;
        this.subjects.total=0
      });
     
   
  }
 

  deleteSubject(subject)
  {
        
        this.subjectService.deleteSubject(subject.id).subscribe((res)=>{
          this.getAllSubjects();
          this.toastService.success(this.translate.instant('dashboard.Subjects.Subject deleted Successfully'));
          // this.confirmModelService.confirmed$.next(null);
        }
        ,
        (err)=>{
          this.getAllSubjects();
          this.toastService.error(this.translate.instant('dashboard.Subjects.error happened,try again'));
          // this.confirmModelService.confirmed$.next(null);
        })
       
      
  
}


  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.evaluation= null;
    this.getAllSubjects();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.subjects.list)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllSubjects();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.confirmModelService.confirmed$.next(null);
  }
 
}
