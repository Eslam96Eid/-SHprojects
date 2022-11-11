import { Component, EventEmitter, Input, OnInit, Output,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { IHoliday } from 'src/app/core/Models/annual-holidays/annual-holiday';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
@Component({
  selector: 'app-holiday-model',
  templateUrl: './holiday-model.component.html',
  styleUrls: ['./holiday-model.component.scss']
})
export class HolidayModelComponent implements OnInit {
  exclamationIcon = faExclamationCircle;
   isOpened:boolean=false;
  @Input('Title')  Title:string;
  @Output() onSave = new EventEmitter();
  holiday;
  editedStatus;
  editedHoliday;
 holidayStatusList;
  curriculamList;
  curriculamListEdited;
  annualCalendarName;
   year;
  holidayFormGrp:FormGroup;
 


  constructor(private sharedService: SharedService, private annualHolidayService: AnnualHolidayService,private fb: FormBuilder,private holidayService:AnnualHolidayService) { 
    this.holidayFormGrp = fb.group({
    
          arabicName: ['', [Validators.required, Validators.maxLength(256)]],
          englishName: ['', [Validators.required, Validators.maxLength(256)]],
          flexibilityStatus: ['', [Validators.required]],
          curriculumName: ['', [Validators.required]],
          dateFrom: ['', [Validators.required]],
          dateTo: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {
    this.annualHolidayService.annualCalendarName.subscribe((res)=>{this.annualCalendarName=res});
    this.annualHolidayService.year.subscribe((res)=>{this.year=res});
    this.sharedService.getAllCurriculum().subscribe((res)=>{this.curriculamList=res});
    this.holidayService.openModel.subscribe((res)=>{this.isOpened=res;});
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
    this.annualHolidayService.editedHoliday.subscribe((res)=>{
      this.editedHoliday=res;
      if(this.editedHoliday)
      {
        this.bind(this.editedHoliday);
      }
    })
  }

  get  annualHolidayFormGrpControl() {
    return this. holidayFormGrp.controls;
  }

  get arabicName() {
    return this.holidayFormGrp.controls['arabicName'] as FormControl;
  }
  get englishName() {
    return this.holidayFormGrp.controls['englishName'] as FormControl;
  }

  get flexibilityStatus() {
    return this.holidayFormGrp.controls['flexibilityStatus'] as FormControl;
  }
  get curriculumName() {
    return this.holidayFormGrp.controls['curriculumName'] as FormControl;
  }

  get dateFrom() {
    return this.holidayFormGrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this.holidayFormGrp.controls['dateTo'] as FormControl;
  }
 


  saveMe()
  {
    if(this.editedHoliday)
    {
      console.log("hhhhhh")
      this.curriculamListEdited=[];
      this.editedStatus=this.holidayFormGrp.value.flexibilityStatus?this.holidayStatusList[0]:this.holidayStatusList[1];
      console.log(this.holidayFormGrp.value.flexibilityStatus);
      console.log(this.editedStatus);
      this.curriculamList.forEach(curriculam => {
        this.holidayFormGrp.value.curriculumName.forEach(id => {
          if(id==curriculam.id)
          {
            this.curriculamListEdited.push(curriculam);
          }
        });
      });
      this.editedHoliday={
        id:this.editedHoliday.id,
        name:{ar:this.holidayFormGrp.value.arabicName,en:this.holidayFormGrp.value.englishName },
        dateFrom: this.holidayFormGrp.value.dateFrom,
        dateTo: this.holidayFormGrp.value.dateTo,
        flexibilityStatus:this.editedStatus,
        curriculums: this.curriculamListEdited,
        createdDate:new Date()
       }; 
      
       this.annualHolidayService.holiday.next(this.editedHoliday);
    }
    else{
    this.holiday={};
    this.holiday.curriculums=[];
    this.holiday.flexibilityStatus=this.holidayFormGrp.value.flexibilityStatus?this.holidayStatusList[0]:this.holidayStatusList[1];
    this.curriculamList.forEach(curriculam => {
      this.holidayFormGrp.value.curriculumName.forEach(id => {
        if(id==curriculam.id)
        {
          this.holiday.curriculums.push(curriculam);
        }
      });
    });
    this.holiday={
      name:{ar:this.holidayFormGrp.value.arabicName,en:this.holidayFormGrp.value.englishName },
      dateFrom: this.holidayFormGrp.value.dateFrom,
      dateTo: this.holidayFormGrp.value.dateTo,
      flexibilityStatus:this.holiday.flexibilityStatus,
      curriculums: this.holiday.curriculums,
      createdDate:new Date()
     };
    
     this.convertDate(this.holiday)
    //  console.log(this.holiday);
     this.annualHolidayService.holiday.next(this.holiday);
  
    }

    this.holidayService.openModel.next(false);
    this.clearForm();
    this.onSave.emit();
  }
  convertDate(holiday)
  {
    this.holiday.dateFrom=holiday.dateFrom.getDate()+"/"+(holiday.dateFrom.getMonth()+1);
    this.holiday.dateTo=holiday.dateTo.getDate()+"/"+(holiday.dateTo.getMonth()+1);
  }
 clearForm()
 {
      this.annualHolidayService.editedHoliday.next(null);
      this.holidayFormGrp.reset();
      Object.keys( this.holidayFormGrp.controls).forEach((key) => {
        const control = this.holidayFormGrp.controls[key];
        control.markAsPristine();
        control.markAsUntouched();
      });
      this.annualHolidayService.annualCalendarName.next("");
      this.annualHolidayService.year.next("");
 }
 bind(holiday)
{

     
        this.curriculamListEdited=[];

        this.editedStatus=holiday.flexibilityStatus.id==0?true:false;

          holiday.curriculums.forEach(curriculam => {
          
              this.curriculamListEdited.push(curriculam.id);
            
          });

        this.holidayFormGrp.patchValue({arabicName:holiday.name.ar, 
          englishName:holiday.name.en, 
          flexibilityStatus: this.editedStatus,
          curriculumName: this.curriculamListEdited,
          dateFrom:holiday.dateFrom,
          dateTo:holiday.dateTo,
          
        });
      
 }
}
