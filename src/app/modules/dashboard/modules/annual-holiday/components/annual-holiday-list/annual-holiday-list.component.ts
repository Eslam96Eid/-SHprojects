import { Location } from '@angular/common';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IAnnualHoliday } from 'src/app/core/Models/annual-holidays/annual-holiday';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday-list.component.html',
  styleUrls: ['./annual-holiday-list.component.scss']
})
export class AnnualHolidayComponent implements OnInit,OnDestroy{
  openModel:boolean=false;
  filtration = {...Filtration,year: '',curriculumName:'',holidayStatus: ''}
  allHolidayLength:number=1;
  col:string="";
  faEllipsisVertical = faEllipsisVertical;
  annualHolidayList: IAnnualHoliday[] = [];
  curriculumList;
  yearList;
  urlParameter:number=0;
  first:boolean=true;
  fixedLength:number=0;
  cities: string[];
  holidayStatusList;
  paginationState= {...paginationInitialState};
  holiday={
    total:0,
    list:[],
    loading:true
  }
  
	holidaysItems: MenuItem[]=[
		{label: this.translate.instant('shared.edit'), icon:'assets/images/dropdown/pen.svg',routerLink:"/dashboard/educational-settings/annual-holiday/edit-holiday/{{e.id}}"},
		
	];
  constructor(
    private exportService: ExportService,
    private headerService: HeaderService,
    private annualHolidayService: AnnualHolidayService, private translate: TranslateService, private router: Router ,private route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.annualHolidayService.openModel.subscribe((res)=>{this.openModel=res;})
    //  this.annualHolidayService.getAllcurriculumName().subscribe((res)=>{this.curriculumList=res.data;})
    // this.getAllHolidays();
    // this.annualHolidayList=this.annualHolidayService.annualHolidayList;

    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('schoolId'));
    });

    this.headerService.Header.next(
      {
        breadCrump: [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays') ,routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list'}
        ]
      }
    );

    this.annualHolidayService.getAllcurriculumName().subscribe((res)=>{this.curriculumList=res.data;})
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
    this.yearList=this.annualHolidayService.yearList;
    



  }
  sortMe(e)
  {
    console.log(e.field);
    this.filtration.SortBy=e.field;
   
    
  }
  
  getAllHolidays(){
    this.annualHolidayService.getAllHolidays(this.filtration).subscribe((res)=>{
      this.holiday.loading = false;
      this.allHolidayLength=res.total;
      this.annualHolidayList=res.data;
      if(this.first)
      {
       this.fixedLength=this.allHolidayLength;
       this.holiday.total=this.fixedLength;
     }

  
    },(err)=>{this.holiday.loading = false;
      this.holiday.total=0
    });
   
  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.year= null;
    this.filtration.curriculumName= null;
    this.filtration.holidayStatus ='';
    this.getAllHolidays();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.annualHolidayList)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllHolidays();

  }
  

  gotoAddHoliday() {
    this.router.navigate(['/dashboard/educational-settings/annual-holiday/new-holiday']);
  }

  saveForm(e)
  {
   this.annualHolidayService.openModel.next(false);
  }
 
  editHoliday()
  {
 
   this.annualHolidayService.openModel.next(true);
 
  }
  ngOnDestroy(): void {
   this.annualHolidayService.openModel.next(false);
 
 }
}
