import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';

@Component({
  selector: 'app-spea-register-child',
  templateUrl: './spea-register-child.component.html',
  styleUrls: ['./spea-register-child.component.scss']
})
export class SpeaRegisterChildComponent implements OnInit {

  componentHeaderData: IHeader={
  breadCrump: [
    { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
    {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `/dashboard/schools-and-students/students/student/`}
  ],
  mainTitle: {
    main: this.translate.instant('dashboard.students.registerChildByCommission')
  }
}

filtration :Filter = {...Filtration, curricuulumId:'', StateId: '',GradeId:''}
paginationState= {...paginationInitialState}


AllGrades$ =this.sharedService.getAllGrades()

// filter
curriculums$ = this.sharedService.getAllCurriculum()
states$ = this.CountriesService.getAllStates()

schools={
  totalAllData:0,
  total:0,
  list:[],
  loading:true
}

submitted


selectedSchool={ index: null, value: null} 


student =
  {
    name: 'محمد على',
    age: 15,
    regestered: false,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school: 'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation: 'ابن الاخ',
    src: 'assets/images/avatar.png'
  }
  selectedGrade={id:'', value: false}


constructor(
  private translate: TranslateService,
  private headerService: HeaderService,
  private sharedService: SharedService,
  private schoolsService:SchoolsService,
  private CountriesService:CountriesService,

) { }

ngOnInit(): void {
  this.headerService.changeHeaderdata(this.componentHeaderData)
  this.getSchools()
}


getSchools(){
  this.schools.loading=true
  this.schools.list=[]

  this.schoolsService.getAllSchools(this.filtration)
  .subscribe(res =>{
    this.schools.loading = false
    this.schools.list = res.data
    this.schools.totalAllData = res.totalAllData
    this.schools.total =res.total

  },err=> {
    this.schools.loading=false
    this.schools.total=0
  })
}


// transferStudent(){
//   this.submitted = true

//   if(this.transferForm.transferType !=  this.TransferTypeEnum.TransferWithinTheEmirate){
//     this.transferForm.divisionId = null
//     this.transferForm.gradeId =null
//     this.transferForm.schoolId =null
//     this.transferForm.trackId=null
//     this.transferForm.subjects=[]
//   }

//   this.studentsService.transferStudent(this.transferForm).subscribe(res=>{
//     this.submitted = false
//     this.toastr.success('تم نقل الطالب بنجاح')
//     this.router.navigate(['../'], {relativeTo: this.route})

//   },(error)=>{ 
//     this.submitted = false
//     this.toastr.error('الشعبه او المسار غير متاح فى هذه المدرسه')

//   })
// }



onSelectSchool(index, school) {
  this.selectedSchool.index= index
  this.selectedSchool.value =school
}


onGradeSelected(gardeId){
  // this.selectedGrade.id = gardeId
  this.selectedGrade.value=true

  this.selectedSchool.index= null
  this.selectedSchool.value =null
  
  this.filtration.GradeId = gardeId
  this.getSchools()
  // this.gradeDivisions$ =  this.gradeService.getGradeDivision(this.selectedSchool.value.id, gardeId).pipe(map(val=>val.data))
}





// clearFilter(){
//   this.filtration.KeyWord =''
//   this.filtration.StateId= null
//   this.filtration.curricuulumId = null
//   this.getSchools()
// }


// paginationChanged(event: paginationState) {
//   this.filtration.Page = event.page
//   this.getSchools()

// }

}
