import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, share } from 'rxjs';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/class.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../../students/services/students/students.service';
import { RegisterChildService } from '../../services/register-child/register-child.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit, AfterViewInit,OnDestroy {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Output() onEdit = new EventEmitter()
  @ViewChild('nav') nav: ElementRef

  step
  navListLength=1
	hideNavControl:boolean= true;

  get permissionEnum(){ return PermissionsEnum }
  studentId = this.route.snapshot.paramMap.get('id')
  schoolId=2
  gradeId=1

  isLoading=true
    // << DATA PLACEHOLDER >> //
  student=
  {
    name:'محمد على',
    age: 15,
    regestered: true,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school:'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation:'ابن الاخ',
    src:'assets/images/avatar.png'
  }

    items: MenuItem[]=[
      {label: this.translate.instant('dashboard.students.transferStudentToAnotherSchool'), icon:'assets/images/shared/student.svg',routerLink:`transfer`},
      {label: this.translate.instant('dashboard.students.sendStudentDeleteRequest'), icon:'assets/images/shared/delete.svg',routerLink:'delete-student/5'},
      {label: this.translate.instant('dashboard.students.IssuanceOfACertificate'), icon:'assets/images/shared/certificate.svg',routerLink:'IssuanceOfACertificateComponent'},
      {label: this.translate.instant('dashboard.students.sendRepeateStudyPhaseReqest'), icon:'assets/images/shared/file.svg',routerLink:'delete-student/5'},
      {label: this.translate.instant('dashboard.students.sendRequestToEditPersonalInfo'), icon:'assets/images/shared/user-badge.svg',routerLink:'delete-student/5'},
      // {label: this.translate.instant('dashboard.students.defineMedicalFile'), icon:'assets/images/shared/edit.svg',routerLink:'student/5/transfer'},
      // {label: this.translate.instant('dashboard.students.editStudentInfo'), icon:'assets/images/shared/list.svg',routerLink:'delete-student/5'},
      // {label: this.translate.instant('dashboard.students.transferStudentFromDivisionToDivision'), icon:'assets/images/shared/recycle.svg',routerLink:'delete-student/5'},
    ];

    optionalSubjects$ = this.sharedService.getAllOptionalSubjects()
    // schoolDivisions$ = this.schoolsService.getSchoolDivisions(2).pipe(map(val =>val.data), share())
    gradeDivisions$ = this.gradeService.getGradeDivision(this.schoolId, this.gradeId).pipe(map(val =>val.data), share())
    currentDivision= [{name:{ar:'الشعبه الاولى '}, id:4}]
    divisionTracks$


    
    transferStudentModelOpened=false
    transferNotAllawed
    showTracks=false
    onSubmit =false
    // Transfer From Division To Division
    transferStudentForm={
      studentId: 14,
      currentDivisionId: '',
      updatedDivisionId: '',
      trackId: '',
      electiveSubjectId: []
    }

    // transferStudentForm =this.fb.group({
    //   studentId:[],
    //   currentDivisionId: [],
    //   updatedDivisionId: [],
    //   trackId: [],
    //   electiveSubjectId: [[]]
    // })

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentsService: StudentsService,
    private schoolsService:SchoolsService,
    private divisionService:DivisionService,
    private gradeService:GradesService,
    private route: ActivatedRoute,
    public childService:RegisterChildService,
    private sharedService: SharedService,
    private toastr: ToastrService) { }

    onEditMode


  ngOnInit(): void {
    this.childService.onEditMode$.subscribe(res=>{
      this.onEditMode = res ? true : false
    })

    setTimeout(()=>{
      this.isLoading = false
    },2000)
  }

  ngAfterViewInit() {
		this.setActiveTab(0)
	}


  onTargetDivisionSelected(division){
    if(division.hasTrack){
      this.showTracks = true
      this.divisionTracks$= this.divisionService.getDivisionTracks(this.schoolId,this.gradeId, division.id)
    }else{
      this.showTracks = false
    }
    if(division.isAcceptStudent){
      this.transferStudentForm.updatedDivisionId= division.id
      this.transferNotAllawed = false
    }else{
      this.transferNotAllawed = true
    }
  }

  transferStudent(){
    this.onSubmit =true
    this.divisionService.transferStudentToAnotherDivision(this.transferStudentForm)
    .subscribe((res)=>{
      this.toastr.success('تم نقل الطالب بنجاح')
      this.onSubmit =false
      this.transferStudentModelOpened = false
      
    },err =>{
      this.onSubmit =false
      this.transferStudentModelOpened = false
      this.toastr.success('تم نقل الطالب بنجاح')

    })
  }








	
	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children
    
		if(nodeIndex == 0){
			navItemsList[nodeIndex].classList.add('active')
			this.navListLength = navItemsList.length
      if(navItemsList[0].dataset.step) this.step = navItemsList[0].dataset.step
      else this.step = 1
		}
	}


	scrollLeft(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft - 175, behavior:'smooth'})
		this.hideNavControl = false;
	}

	scrollRight(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft + 175, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;

	}

  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }

}
