import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, of, take } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/iheader';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TransferType } from 'src/app/shared/enums/school/school.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/class.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../services/students/students.service';

type transeferBy = 'parent' | 'commission';
type Mode = 'transfer' | 'register'


@Component({
  selector: 'app-transfer-student',
  templateUrl: './transfer-student.component.html',
  styleUrls: ['./transfer-student.component.scss']
})
export class TransferStudentComponent implements OnInit {
  faPlus = faPlus
  @ViewChild('f',{static: false}) form :NgForm
  
  
  get TransferTypeEnum(){ return TransferType}

  mode:Mode = this.route.snapshot.data['mode']
  studentId = this.route.snapshot.paramMap.get('id')
  schoolId =2
  componentHeaderData: IHeader={
    breadCrump: [
      { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {
        label: this.mode == 'transfer' ? this.translate.instant('dashboard.students.transferStudent') : 
        this.translate.instant('dashboard.students.registerChildByCommission'), 
        routerLink: `/dashboard/schools-and-students/students/student/${this.studentId}/${this.mode}`
      }
    ],
    mainTitle: {
      main: this.mode == 'transfer' ? this.translate.instant('dashboard.students.transferStudent') : this.translate.instant('dashboard.students.registerChildByCommission')
    }
  }

  filtration :Filter = {...Filtration, curricuulumId:'', StateId: ''}
  paginationState= {...paginationInitialState}
  
  schoolGrades$
  gradeDivisions$ 
  divisionTracks$

  AllDivisions$ =this.sharedService.getAllDivisions()
  AllGrades$ =this.sharedService.getAllGrades()
  AllTracks$ =this.sharedService.getAllTraks()
  optionalSubjects$ = this.sharedService.getAllOptionalSubjects()
  transferType= [
    {name:this.translate.instant('dashboard.students.insideEmara'), value: TransferType.TransferWithinTheEmirate},
    {name:this.translate.instant('dashboard.students.outSideEmara'), value: TransferType.TransferOutsideTheEmirate},
    {name:this.translate.instant('dashboard.students.outsideCountry'), value: TransferType.TransferOutOfTheCountry},
  ]

  // filter
  curriculums$ = this.sharedService.getAllCurriculum()
  states$ = this.CountriesService.getAllStates()

  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  
  transferForm={
    transferType:null,
    schoolId: null,
    gradeId: null,
    divisionId: null,
    trackId: null,
    studentIds: [this.studentId],
    subjects:[]
  }
  
  isFormValid =false
  submitted=false
  transeferBy: transeferBy

  selectedSchool={
    index: null,
    value: null
  }
  selectedScoolIndex 
  selectedGardeId
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


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private studentsService:StudentsService,
    private schoolsService:SchoolsService,
    private CountriesService:CountriesService,
    private toastr: ToastrService,
    private gradeService: GradesService,
    private divisionService: DivisionService
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


  transferStudent(){
    this.submitted = true
    this.studentsService.transferStudent(this.transferForm).subscribe(res=>{
      this.submitted = false
      this.toastr.success('تم نقل الطالب بنجاح')
    },(error)=>{ 
      this.submitted = false
      this.toastr.error('الشعبه او المسار غير متاح فى هذه المدرسه')

    })
  }

  onSelectSchool(index, school) {
    this.selectedSchool.index= index
    this.selectedSchool.value =school
    this.transferForm.schoolId = school.id

    let grades=[
      {name: {ar:'الصف الاول'},id:1},
      {name: {ar:'الصف الثانى'},id:1},
      {name: {ar:'الصف الثالث'},id:1},
    ]
    this.schoolGrades$=of(grades)
    // this.gradeDivisions$ =this.schoolsService.getSchoolGardes(school.id).pipe(take(1)).subscribe()
  }

  // to get Divisions
  onGradeSelected(gardeId){
    this.selectedGardeId = gardeId
    this.gradeDivisions$ =  this.gradeService.getGradeDivision(this.selectedSchool.value.id, gardeId).pipe(map(val=>val.data))
  }

  // to get tracks
  onDivisionSelected(divisionId){
    this.divisionTracks$= this.divisionService.getDivisionTracks(this.selectedSchool.value.id,this.selectedGardeId,divisionId)
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.StateId= null
    this.filtration.curricuulumId = null
    this.getSchools()
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }

}
