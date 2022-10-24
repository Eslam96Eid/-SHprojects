import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ISubject } from 'src/app/core/Models/isubject';
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
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SubjectsComponent implements OnInit {
  filtration = {...Filtration,evaluation: ''};
  faEllipsisVertical = faEllipsisVertical;
  subjectsList: ISubject[] = [];
  evaluationTypeList;
  first:boolean=true;
  allSubjectsLength:number=1;
  fixedLength:number=0;
  message:string=""; 
  paginationState= {...paginationInitialState};
  subjects={
    total:0,
    list:[],
    loading:true
  }
  cities: string[];
  constructor(private exportService: ExportService,private layoutService:LayoutService,private toastr:ToastrService,private confirmationService: ConfirmationService,private headerService: HeaderService, private router: Router, private translate: TranslateService, private subjectService: SubjectService) {
  }

  ngOnInit(): void {

    this.getAllSubjects();
    this.evaluationTypeList=this.subjectService.evaluationTypeList;
    console.log(...this.evaluationTypeList);
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'),routerLink: '/dashboard/educational-settings/subject/subjects-list'}],
      }
    );
    this.cities = this.subjectService.cities;
   

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

  getAllSubjects(){
   console.log(this.filtration);
    this.subjectService.getAllSubjects(this.filtration).subscribe((res)=>{
        this.subjects.loading = false;
   
     this.allSubjectsLength=res.total;
    
     if(this.first)
     {
      this.fixedLength=this.allSubjectsLength;
      this.subjects.total=this.fixedLength;
    }
     console.log(this.fixedLength)
      this.subjectsList=res.data;
      
    
    
      },(err)=>{this.subjects.loading = false;
        this.subjects.total=0
      });
     
   
  }

  deleteSubject(subject:ISubject)
  {
    

    this.confirmationService.confirm({
      message: this.translate.instant('dashboard.Subjects.Are you sure that you want to delete Subject')+" \" "+subject.subjectName.ar+" \" "+this.translate.instant('shared.?'),
      header: this.translate.instant('shared.Delete Confirmation'),
      icon: 'pi pi-exclamation-circle',
      accept:() => { 
        console.log(subject.id);
        this.subjectService.deleteSubject(subject.id).subscribe((res)=>{
          this.getAllSubjects();
          this.toastr.clear();
          this.layoutService.message.next('dashboard.Subjects.Subject deleted Successfully');
          this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
          this.toastr.success( this.translate.instant(this. message));

        }
        ,
        (err)=>{
          this.getAllSubjects();
          this.toastr.clear();
          this.layoutService.message.next('dashboard.Subjects.error happened,try again');
          this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
          this.toastr.error( this.translate.instant(this. message));
        })
       
      }
  });
}
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.evaluation= null;
    this.getAllSubjects();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.subjectsList)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllSubjects();

  }

 
}
