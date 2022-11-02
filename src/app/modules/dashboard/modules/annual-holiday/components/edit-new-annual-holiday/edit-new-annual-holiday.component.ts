import { Component, OnInit,OnDestroy } from '@angular/core';


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import {  faPlus,faCalendar, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { IAnnualHoliday } from 'src/app/core/Models/annual-holidays/annual-holiday';


@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit {
  cities: string[];
  isEqualYear: number = 0;
  schoolYear: number = 0;
  subYear: number = 0;
  plusIcon = faPlus;
  checkIcon= faCheck;
  message:string="";
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
   annualHolidayFormGrp: FormGroup;
   annualHolidayList: IAnnualHoliday[] = [];
   annualHolidayAddedList: IAnnualHoliday[] = [];
   annualHolidayObj={};
   urlParameter: number=0;
   yearList;
   curriculumList;
   holidayStatusList;
   dateFromConverted:string="";
   dateToConverted:string="";
   errorHappened:boolean=false;
   
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private layoutService:LayoutService, private router: Router, private annualHolidayService: AnnualHolidayService, private headerService: HeaderService, private toastr: ToastrService, private translate: TranslateService) {

    this.  annualHolidayFormGrp = fb.group({
      holiday: fb.array([
        fb.group({
          arabicName: ['', [Validators.required, Validators.maxLength(256)]],
          flexibilityStatus: ['', [Validators.required]],
          curriculumName: ['', [Validators.required]],
          dateFrom: ['', [Validators.required]],
          dateTo: ['', [Validators.required]]
        })])
      ,
      year: ['', [Validators.required]],
      smester: ['', [Validators.required, Validators.maxLength(256)]]

    });
  }

  ngOnInit(): void {
  this.annualHolidayAddedList.push({} as IAnnualHoliday );
  this.route.paramMap.subscribe(param => {
    this.urlParameter = Number(param.get('holidayId'));
  });

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays'),routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',routerLinkActiveOptions:{exact: true} },
          {label: (this.urlParameter==0||this.urlParameter.toString()=='')?  this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar'):this.translate.instant('dashboard.AnnualHoliday.Edit Annual Holidays Calendar'),
            routerLink: (this.urlParameter==0||this.urlParameter.toString()=='')? '/dashboard/educational-settings/annual-holiday/new-holiday':'/dashboard/educational-settings/annual-holiday/edit-holiday/'+this.urlParameter
          }
     
        ],
        'mainTitle':{main:(this.urlParameter==0||this.urlParameter.toString()=='')? this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar'):this.translate.instant('dashboard.AnnualHoliday.Edit Annual Holidays Calendar')}
     
      }
    );
   
    this.getAllHolidays();
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
    this.yearList=this.annualHolidayService.yearList;
    this.annualHolidayService.getAllcurriculumName().subscribe((res)=>{this.curriculumList=res.data;})
   
  }
 



  get  annualHolidayFormGrpControl() {
    return this. annualHolidayFormGrp.controls;
  }

  get arabicName() {
    return this. annualHolidayFormGrp.controls['arabicName'] as FormControl;
  }
  get holiday(): FormArray {
    return this. annualHolidayFormGrp.controls['holiday'] as FormArray;
  }
  get year() {
    return this. annualHolidayFormGrp.controls['year'] as FormControl;
  }
  get smester() {
    return this. annualHolidayFormGrp.controls['smester'] as FormControl;
  }
  get flexibilityStatus() {
    return this. annualHolidayFormGrp.controls['flexibilityStatus'] as FormControl;
  }
  get curriculumName() {
    return this. annualHolidayFormGrp.controls['curriculumName'] as FormControl;
  }

  get dateFrom() {
    return this. annualHolidayFormGrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this. annualHolidayFormGrp.controls['dateTo'] as FormControl;
  }




  addNew() {
    var availableadd = 1;
    
    for(let i in this.holiday.controls)
    {
      // if ((this.annualHolidayAddedList[i].arabicName == undefined) || (this.annualHolidayAddedList[i].flexibilityStatus == undefined) || (this.annualHolidayAddedList[i].dateTo ==undefined) || (this.annualHolidayAddedList[i].dateTo == undefined) || (this.annualHolidayAddedList[i].curriculumName == undefined))

      //   { 
      //     availableadd = 0;
      //   }
        }
    if (availableadd == 1) {
      this.holiday.push(this.fb.group({
        arabicName: ['', [Validators.required]],
        flexibilityStatus: ['', [Validators.required]],
        curriculumName: ['', [Validators.required]],
        dateFrom: [''],
        dateTo: ['']
      }));
      this.annualHolidayAddedList.push({} as IAnnualHoliday );
    }
    availableadd == 1
    
     
  }
  
  getAllHolidays(){
    this.annualHolidayService.getAllHolidays({}).subscribe((res)=>{
  
      this.annualHolidayList=res.data;
     

       this.annualHolidayList.forEach(element => {
        if(element.id==this.urlParameter )
        {
          this.annualHolidayAddedList[0]=element;
         console.log(this.annualHolidayAddedList[0]);
        }
       });
    });

   
  }
   saveMe()
   {
    if(this.urlParameter)
    {
      this.annualHolidayAddedList.forEach(holiday => {
        this.annualHolidayObj={};
        this.convertDate(holiday);
        this.annualHolidayObj={'annualCalendarName':holiday.annualCalendarName,
        // 'arabicName':holiday.arabicName,
        // 'flexibilityStatusId':holiday.flexibilityStatus,
        // 'curriculumId':holiday.curriculumName,
        'dateFrom':this.dateFromConverted,
        'dateTo':this.dateToConverted,
        'year':holiday.year
      }
        this.annualHolidayService.updateHoliday(this.urlParameter,this.annualHolidayObj).subscribe((res)=>{console.log(res);
          this.showSuccessedMessage();
          this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        },(err)=>{this.showErrorMessage();});
        
      });
     
    }
    else
    { console.log(this.annualHolidayAddedList);
      this.annualHolidayAddedList.forEach(holiday => {
        this.annualHolidayObj={};
        this.convertDate(holiday);
        this.annualHolidayObj={'annualCalendarName':this.annualHolidayAddedList[0].annualCalendarName,
        // 'arabicName':holiday.arabicName,
        // 'flexibilityStatusId':holiday.flexibilityStatus,
        // 'curriculumId':holiday.curriculumName,
        'dateFrom':this.dateFromConverted,
        'dateTo':this.dateToConverted,
        'year':this.annualHolidayAddedList[0].year};
        console.log(this.annualHolidayObj);
        
        this.annualHolidayService.addHoliday(this.annualHolidayObj).subscribe((res)=>{
        
        },(err)=>{this.errorHappened=true;this.showErrorMessage();});
        
      });
      setTimeout(() => {
        if(!this.errorHappened)
        {
          this.showSuccessedMessage();
          this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        }
        else
        {
          this.showErrorMessage();
        }
        
      }, 3000);
    
       
    }
   }
   showSuccessedMessage()
  {

    this.toastr.success( this.translate.instant(this. message));
  }

  showErrorMessage()
  {

    this.toastr.error( this.translate.instant(this. message));
  }

 convertDate(holiday)
 {
  this.dateFromConverted=holiday.dateFrom.getDate()+"/"+(holiday.dateFrom.getMonth()+1);
  this.dateToConverted=holiday.dateTo.getDate()+"/"+(holiday.dateTo.getMonth()+1);
 }

}

