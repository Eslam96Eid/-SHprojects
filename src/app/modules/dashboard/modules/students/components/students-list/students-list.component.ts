import { Component, OnInit } from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/class.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  // << ICONS >> //
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown

 
  isCollapsed=true

  // << HRADER DATA >> //
  componentHeaderData: IHeader={
		breadCrump: [
      {label:'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students'},
		],
	}




  filtration:Filter = {
    ...Filtration, 
    SchoolId:"", 
    curricuulumId:"", 
    GradeId:"",
    DivisionId:"",
    TrackId:"",
    NationalityId:"",
    IsPassed:null,
    IsChildOfAMartyr: null, 
    TalentId: null,
    // withDisabilities: null,
    IsInFusionClass:null,
    IsSpecialClass:null
  }
  paginationState= {...paginationInitialState}

  // << CONDITIONS >> //
  isSchoolSelected = false


  // << DATA PLACEHOLDER >> //
  items: MenuItem[]=[
		{label: this.translate.instant('dashboard.students.veiwStudentDetails'), icon:'assets/images/shared/user.svg',routerLink:'student/1'},
		// {label: this.translate.instant('dashboard.students.transferStudentToAnotherSchool'), icon:'assets/images/shared/student.svg',routerLink:'student/5/transfer'},
    // {label: this.translate.instant('dashboard.students.sendStudentDeleteRequest'), icon:'assets/images/shared/delete.svg',routerLink:'delete-student/5'},
		// {label: this.translate.instant('dashboard.students.defineMedicalFile'), icon:'assets/images/shared/edit.svg',routerLink:'student/5/transfer'},
		// {label: this.translate.instant('dashboard.students.sendRepeateStudyPhaseReqest'), icon:'assets/images/shared/file.svg',routerLink:'delete-student/5'},
    // {label: this.translate.instant('dashboard.students.editStudentInfo'), icon:'assets/images/shared/list.svg',routerLink:'delete-student/5'},
		// {label: this.translate.instant('dashboard.students.sendRequestToEditPersonalInfo'), icon:'assets/images/shared/user-badge.svg',routerLink:'delete-student/5'},
    // {label: this.translate.instant('dashboard.students.transferStudentFromDivisionToDivision'), icon:'assets/images/shared/recycle.svg',routerLink:'delete-student/5'},
    // {label: this.translate.instant('dashboard.students.IssuanceOfACertificate'), icon:'assets/images/shared/certificate.svg',routerLink:'IssuanceOfACertificateComponent/5'}
	];
  countries$ = this.countriesService.getCountries()
  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = this.schoolsService.getAllSchools()
  AllDivisions$ =this.sharedService.getAllDivisions()
  AllGrades$ =this.sharedService.getAllGrades()
  AllTracks$ =this.sharedService.getAllTraks()

  talents$ = this.studentsService.getTalents()
  booleanOptions = this.sharedService.booleanOptions

  passedOptions = [
    {name: this.translate.instant('shared.allStatus.passed'), value:true}, 
    {name: this.translate.instant('shared.allStatus.notPassed'), value:false}
  ]

  disabilitiesOptions = [
    {name: this.translate.instant('shared.no'), value:false},
    {name: this.translate.instant('shared.specialClass'), value:true},
    {name: this.translate.instant('shared.fusionClass'), value:true}
  ]


  students ={
    total:0,
    list:[],
    loading:false
  }

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private studentsService: StudentsService,
    private sharedService: SharedService,
    private countriesService: CountriesService,
    private schoolsService: SchoolsService,
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()

  }
  
  
  getStudents(){
    console.log(this.filtration);
    
    this.students.loading=true
    this.students.list=[]
    this.studentsService.getAllStudents(this.filtration)
    .subscribe(res=>{
      this.students.loading=false
      this.students.list = res.data
      this.students.total =res.total 

    },err=> {
      this.students.loading=false
      this.students.total=0
    })
  }

  // schoolSelected(SchoolId){
  //   this.isSchoolSelected = true
  //   this.schoolGrades$ = this.gradesService.getSchoolGardes(SchoolId)
  //   this.schoolTracks$ = this.gradesService.getGradeTracks(SchoolId)
  //   this.schoolDivisions$ = this.divisionService.getAllDivisions(SchoolId)
  // }

  onSelectDisabilities(e){

  }


  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getStudents()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.SchoolId= null
    this.filtration.curricuulumId= null
    this.filtration.GradeId= null
    this.filtration.DivisionId =''
    this.filtration.TrackId = null
    this.filtration.NationalityId= null
    this.filtration.IsChildOfAMartyr = null
    this.filtration.TalentId = null
    this.filtration.IsPassed = null
    // this.filtration.withDisabilities = null
    this.getStudents()
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudents()

  }
}
