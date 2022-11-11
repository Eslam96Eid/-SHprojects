import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { School } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';

@Component({
  selector: 'app-grace-period',
  templateUrl: './grace-period.component.html',
  styleUrls: ['./grace-period.component.scss']
})
export class GracePeriodComponent implements OnInit {

  faPlus=faPlus
  curriculums$ = this.sharedService.getAllCurriculum()


  dashboardHeaderData:IHeader ={
    breadCrump:[
      { label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/dashboard/manager-tools/settings',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.SystemSetting.manageGracePeriod'),routerLink: '/dashboard/manager-tools/settings/grace-period/new' }

    ],
    mainTitle: {main:this.translate.instant('dashboard.SystemSetting.manageGracePeriod')}
  }


  type:GracePeriodEnum=null

  gracePeriodList=[
    {name:'نقل الطلاب بشكل جماعى' , value:GracePeriodEnum.transferStudents},
    {name:'رفع الدرجات', value: GracePeriodEnum.raisDegrees},
    {name:'حذف الطلاب', value: GracePeriodEnum.deleteStudents}
  ]

  get gracePeriodEnum(){return GracePeriodEnum}

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];

  filtration={...Filtration,PageSize: null,StateId:'',curricuulumId:""}

  schools={
    list:[],
    totalAllData:0,
    total:0,
    loading:false
  }
  


  transferStudentsForm= this.fb.group({
    gracePeriodType:[],
    from:[],
    to:[],
    schoolsFrom: this.fb.array([]),
    schoolsTo:this.fb.array([]),

  })

  get schoolsTo(){ return this.transferStudentsForm.controls.schoolsTo as FormArray}
  get schoolsFrom(){ return this.transferStudentsForm.controls.schoolsFrom as FormArray}


  gracePeriodForm=this.fb.group({
    gracePeriodType:[],
    schools: this.fb.array([]),
  })

  get GP_Schools(){ return this.gracePeriodForm.controls.schools as FormArray}


  constructor(
    private headerService:HeaderService,
    private schoolsService:SchoolsService,
    private translate:TranslateService,
    private fb:FormBuilder,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.headerService.Header.next(this.dashboardHeaderData);
    this.getSchools()
  }

  getSchools(){
    this.schools.loading = true
    
    this.schoolsService.getAllSchools(this.filtration).subscribe(res=>{
      // this.schools.list.push(...res.data)
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total
      this.schools.loading =  false
    })
  }

  addNewSchoolToGarcePeriod(){
    this.GP_Schools.push(this.fb.group({
      schoolId:[],
      gradesIds: [[]]
    }))
  }

  deleteGpSchool(index){
    this.GP_Schools.removeAt(index)
  }


  // ----------------------------------------------------
  addNewSchooleToTranser(){
    this.schoolsFrom.push(this.fb.group({
      schoolId:[],
      gradesIds: [[]]
    }))
  }

  deleteSchoolFrom(index){
    this.schoolsFrom.removeAt(index)
  }

  addNewSchooleToAccept(){
    this.schoolsTo.push(this.fb.group({
      schoolId:[],
      gradesIds: [[]],
      divisionsIds:[[]]
    }))
  }

  deleteSchoolToAccept(index){
    this.schoolsTo.removeAt(index)
  }


  onLazyLoad(event){
    console.log(event);
    let pages = this.schools.totalAllData /this.filtration.PageSize
    let currPage = Math.ceil(event.first /this.filtration.PageSize)
    this.filtration.Page= currPage+1
    console.log(this.filtration.Page);
    
    this.getSchools()
    
  }

}
