import { Component, OnInit,OnDestroy } from '@angular/core';


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { UserService } from 'src/app/core/services/user/user.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import {  faPlus,faCalendar, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { IAnnualHoliday, IHoliday } from 'src/app/core/Models';


@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit,OnDestroy {
  isBtnLoading: boolean=false;
  openModel:boolean=false;
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
   holidayAdded;
   availableAdded=1;
   holidayList;
   annualHolidayObj:IAnnualHoliday={} as  IAnnualHoliday;
   urlParameter: string='';
   parameterInAddHoliday='';
   yearList;
   curriculumList;
   curriculumAddedList;
   statusAdded;
   holidayStatusList;
   dateFromConverted:string="";
   dateToConverted:string="";
   holidayFixedLength=0;
   first=0;
   rows=6;
  constructor(private sharedService: SharedService,private userService: UserService,private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private annualHolidayService: AnnualHolidayService, private headerService: HeaderService, private toastService: ToastService, private translate: TranslateService) {

    this.annualHolidayFormGrp = fb.group({
      year: ['', [Validators.required]],
      englishSmester: ['', [Validators.required, Validators.maxLength(256)]],
      arabicSmester: ['', [Validators.required, Validators.maxLength(256)]],
      curriculum:[''],
      status:[''],
    });
  }

  ngOnInit(): void {


    this.sharedService.getAllCurriculum().subscribe((res)=>{this.curriculumList=res});
    if(localStorage.getItem('holidayList'))
    {

        this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
    }
    else
    {

      this.holidayList=[];
    }

    this.annualHolidayService.holidayList.next(this.holidayList);
    this.annualHolidayService.holidayList.subscribe((res)=>{this.holidayList=res;
      if(localStorage.getItem('holidayList'))
      {this.holidayFixedLength=JSON.parse(localStorage.getItem('holidayList')).length;}
    });
    this.annualHolidayService.openModel.subscribe((res)=>{this.openModel=res;})

  this.route.paramMap.subscribe(param => {
    this.urlParameter = param.get('holidayId');
  });

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays'),routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',routerLinkActiveOptions:{exact: true} },
          {label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar'):this.translate.instant('dashboard.AnnualHoliday.Edit Annual Holidays Calendar'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/educational-settings/annual-holiday/new-holiday':'/dashboard/educational-settings/annual-holiday/edit-holiday/'+this.urlParameter
          }

        ],
        'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar'):this.translate.instant('dashboard.AnnualHoliday.Edit Annual Holidays Calendar')}

      }
    );


    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
     this.annualHolidayService.getAllYears().subscribe((res)=>{this.yearList=res})


  }



  get status() {
    return this. annualHolidayFormGrp.controls['status'] as FormControl;
  }
  get curriculum() {
    return this. annualHolidayFormGrp.controls['curriculum'] as FormControl;
  }

  get year() {
    return this. annualHolidayFormGrp.controls['year'] as FormControl;
  }
  get englishSmester() {
    return this. annualHolidayFormGrp.controls['englishSmester'] as FormControl;
  }
  get arabicSmester() {
    return this. annualHolidayFormGrp.controls['arabicSmester'] as FormControl;
  }








  getAllHolidays(){
    this.annualHolidayService.getAllHolidays({}).subscribe((res)=>{

      this.annualHolidayList=res.data;
     });


  }
  getCurriculumIds(curriculums)
  {
    this.curriculumAddedList=[];
    curriculums.forEach(element => {
      this.curriculumAddedList.push(element.id);
    });
    return this.curriculumAddedList;
  }

   save()
   {

    this.annualHolidayService.yearList.forEach(year=> {
      if(year.year=this.annualHolidayFormGrp.value.year )
      {
        this.annualHolidayObj.yearId=year.id;
      }
     });
    this.annualHolidayObj={
      annualCalendar:{ar:this.annualHolidayFormGrp.value.arabicSmester,en:this.annualHolidayFormGrp.value.englishSmester} ,
      yearId: this.annualHolidayObj.yearId,
      holidayModels:this.holidayList.map((holiday)=>{return {
        'name':{'ar':holiday.name.ar,'en':holiday.name.en },
        'dateFrom':holiday.dateFrom,
        'dateTo': holiday.dateTo,
        'flexibilityStatus':holiday.flexibilityStatus.id,
        'curriculums': this.getCurriculumIds(holiday.curriculums)
        }})
     };
    console.log(this.annualHolidayObj);

    if(this.urlParameter)
    {
    //   this.annualHolidayAddedList.forEach(holiday => {
    //     this.annualHolidayObj={};
    //     this.convertDate(holiday);
    //     this.annualHolidayObj={'annualCalendarName':holiday.annualCalendar,
    //     'arabicName':holiday.arabicName,
    //     'flexibilityStatusId':holiday.flexibilityStatus,
    //     'curriculumId':holiday.curriculumName,
    //     'dateFrom':this.dateFromConverted,
    //     'dateTo':this.dateToConverted,
    //     'year':holiday.yearId
    //   }
    // }

        // this.annualHolidayService.updateAnnualHoliday(Number(this.urlParameter),this.annualHolidayObj).subscribe((res)=>{console.log(res);
        //   this.showSuccessedMessage();
        //   this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        // },(err)=>{this.showErrorMessage();});



    }
    else
    {
        this.annualHolidayService.addAnnualHoliday(this.annualHolidayObj).subscribe((res)=>{
              this.showSuccessedMessage();
              this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        },(err)=>{this.showErrorMessage();});
    }
   }
   showSuccessedMessage()
  {
    this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday added Successfully'));
  }

  showErrorMessage()
  {
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
  }

 convertDate(holiday)
 {
  this.dateFromConverted=holiday.dateFrom.getDate()+"/"+(holiday.dateFrom.getMonth()+1);
  this.dateToConverted=holiday.dateTo.getDate()+"/"+(holiday.dateTo.getMonth()+1);
 }

 getHoliday(e)
 {

  this.availableAdded=1;
  this.annualHolidayService.holiday.subscribe((res)=>{
    this.holidayAdded=res;

    this.holidayList.forEach(holiday => {
      if(holiday.name.ar==this.holidayAdded.name.ar)
      {
          this.availableAdded=0;

      }
    });
    if(this.availableAdded==1)
    {

      if(this.holidayAdded.id==null||undefined)
      {
            this.holidayList.push(res);
            this.holidayList=this.holidayList.map((holiday,i)=>{return {
            'id':i+1,
            'name':{'ar':holiday.name.ar,'en':holiday.name.en },
            'dateFrom':holiday.dateFrom,
            'dateTo': holiday.dateTo,
            'flexibilityStatus':holiday.flexibilityStatus,
            'curriculums': holiday.curriculums,
            'createdDate': holiday.createdDate
            }});

          localStorage.setItem('holidayList', JSON.stringify(this.holidayList));
          this.annualHolidayService.holidayList.next(this.holidayList);

      }

    }
  });
    if(this.holidayAdded.id)
    {

        this.holidayList.forEach(holiday => {
            if(holiday.id==this.holidayAdded.id)
            {
                 this.holidayList[this.holidayAdded.id-1].id=this.holidayAdded.id;
                 this.holidayList[this.holidayAdded.id-1].name.ar=this.holidayAdded.name.ar;
                 this.holidayList[this.holidayAdded.id-1].name.en=this.holidayAdded.name.en;
                 this.holidayList[this.holidayAdded.id-1].dateFrom=this.holidayAdded.dateFrom;
                 this.holidayList[this.holidayAdded.id-1].dateTo=this.holidayAdded.dateTo;
                 this.holidayList[this.holidayAdded.id-1].curriculums=this.holidayAdded.curriculums;
                 this.holidayList[this.holidayAdded.id-1].flexibilityStatus=this.holidayAdded.flexibilityStatus;

            }
          });

          this.saveInlocalStorage();
          this.annualHolidayService.holidayList.next(this.holidayList);

    }


  this.annualHolidayService.openModel.next(false);
 }

 newHoliday()
 {
  this.getHolidayNameAndYear();
  this.parameterInAddHoliday='';
  this.annualHolidayService.openModel.next(true);

 }
 ngOnDestroy(): void {

  localStorage.removeItem('holidayList')
  this.annualHolidayService.openModel.next(false);

}
editHoliday(holiday)
{
 this.getHolidayNameAndYear();

  this.parameterInAddHoliday=holiday.id;
  this.annualHolidayService.editedHoliday.next(holiday);
  this.annualHolidayService.openModel.next(true);
}
deleteHoliday(id)
{

  if(this.holidayList.length > 1)
     {this.holidayList.splice(id-1, 1);}
  else
     {this.holidayList =[];}

  this.saveInlocalStorage();
  this.annualHolidayService.holidayList.next(this.holidayList);
}
saveInlocalStorage()
{

  localStorage.removeItem('holidayList');

  localStorage.setItem('holidayList', JSON.stringify(this.holidayList));

}

getHolidayNameAndYear()
{
  this.annualHolidayService.annualCalendarName.next(this.annualHolidayFormGrp.value.arabicSmester);
  this.annualHolidayService.year.next(this.annualHolidayFormGrp.value.year);
}
export(e){

}
filter() {

  this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
  if(this.annualHolidayFormGrp.value.status!=''||this.annualHolidayFormGrp.value.curriculum)
  {
    if(this.annualHolidayFormGrp.value.status!=''&&!this.annualHolidayFormGrp.value.curriculum)
    {

      this.holidayList = this.holidayList.filter((val) =>

     val.flexibilityStatus.name.ar==this.annualHolidayFormGrp.value.status

    );
    }
    else if (this.annualHolidayFormGrp.value.status==''&&this.annualHolidayFormGrp.value.curriculum)
    {

      this.holidayList = this.holidayList.filter((val) =>

         val.curriculums[0].id==this.annualHolidayFormGrp.value.curriculum

     );
    }

    else if (this.annualHolidayFormGrp.value.status!=''&&this.annualHolidayFormGrp.value.curriculum)
    {

      this.holidayList = this.holidayList.filter((val) =>

      val.curriculums[0].id==this.annualHolidayFormGrp.value.curriculum && val.flexibilityStatus.name.ar==this.annualHolidayFormGrp.value.status

     );
    }
  }
  else
  {
    this.holidayList=JSON.parse(localStorage.getItem('holidayList'))
  }
  this.annualHolidayService.holidayList.next(this.holidayList);
}
search(keyWord){
  this.holidayList=JSON.parse(localStorage.getItem('holidayList'));

  if(keyWord)
  {

    this.holidayList = this.holidayList.filter((val) =>
    val.name.ar.toLowerCase().includes(keyWord)
    );
  }
  else
  {
    this.holidayList=JSON.parse(localStorage.getItem('holidayList'))
  }
  this.annualHolidayService.holidayList.next(this.holidayList);
  this.holidayFixedLength=JSON.parse(localStorage.getItem('holidayList')).length;


}
clearFilter(){
  this.status.setValue('');
  this.curriculum.setValue('');
  this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
  this.annualHolidayService.holidayList.next(this.holidayList);
}
// paginationChanged(e)
// {
//   this.holidayList=JSON.parse(localStorage.getItem('holidayList'));

//   this.first = e.first+1
//   this.rows = e.rows
//   console.log(e)
//   this.holidayList= this.holidayList.slice(e.first,e.rows*e.page)
//   this.annualHolidayService.holidayList.next(this.holidayList);

// }

}
