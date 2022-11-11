import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { DateValidators } from 'src/app/core/classes/validation';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-annul-holiday-list',
  templateUrl: './annul-holiday-list.component.html',
  styleUrls: ['./annul-holiday-list.component.scss']
})
export class AnnulHolidayListComponent implements OnInit {

  first = 0
  rows = 4

  date =new Date('2024-10-13')
  schoolId = +this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration}
  paginationState={...paginationInitialState}

  selectedHoliday
  openHolidaytModel=false

  menuItems: MenuItem[]=[
    {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},
    {label: this.translate.instant('dashboard.schools.sendEditHolidayReq'), icon:'assets/images/shared/list.svg'},
  ];

  holidays={
    totalAllData: 0,
    total:0,
    list:[],
    loading:true
  }


  submitted=false
  editHolidayForm = this.fb.group({
    schoolId: [this.schoolId],
    dateFrom:["", Validators.required],
    dateTo:["", Validators.required],
    description:[],
    requestStatus:[0]
  },{validators: [
    DateValidators.greaterThan('dateFrom', 'dateTo')
  ]})

  get holidayForm(){ return this.editHolidayForm.controls}

  constructor(
    private route: ActivatedRoute,
    private schoolsService:SchoolsService,
    private translate: TranslateService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getHolidays()
  }

  getHolidays(){
    this.holidays.loading=true
    this.holidays.list=[]
    this.schoolsService.getSchoolAnnualHolidays(this.schoolId,this.filtration)
    .subscribe(res=>{
      this.holidays.loading = false
      this.holidays.list = res.data
      this.holidays.totalAllData = res.totalAllData
      this.holidays.total =res.total
    },err=> {
      this.holidays.loading=false
      this.holidays.total=0
    })
  }

  editFlexableHoliday(holiday){

      this.selectedHoliday= holiday
      console.log(this.selectedHoliday);
      this.openHolidaytModel=true
  }

  editAnnualHoliday(holidayId){
    this.router.navigate(['dashboard/educational-settings/annual-holiday/edit-holiday/',holidayId])

  }

  updateFlexableHoliday(){
    this.submitted = true
      this.schoolsService.updateFlexableHoliday(this.selectedHoliday.id,this.editHolidayForm.value)
      .subscribe(res =>{
        this.submitted = false
        this.openHolidaytModel= false
      })
  }

  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getHolidays()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getHolidays()
  }


  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getHolidays()

  }

}
