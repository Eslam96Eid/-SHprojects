import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  // << ICONS >> //
  faCheck= faCheck
  faChevronDown= faChevronDown
  studentId = +this.route.snapshot.paramMap.get('id')

  // << ICONS >> //
  componentHeaderData: IHeader={
		breadCrump: [
      {label: this.translate.instant('dashboard.students.studentsList'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.editStudentInfo'),routerLink:'/dashboard/schools-and-students/students/student/'+this.studentId }
		],
    mainTitle:{main: this.translate.instant('dashboard.students.editStudentInfo')}
	}


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



  // << CONDITIONS >> //
  step =1


  // << FORMS >> //
  studentFormm = this.fb.group({
    id: [] ,
    arabicName: [],
    englishName: [],
    surName: [],
    guardianId: [],
    schoolId: [],
    gradeId: [],
    classRoomId: [] ,
    schoolYearId: [] ,
    genderId: [] ,
    religionId: [] ,
    curriculumId: [] ,
    trackId: [] ,
    nationalityId: [] ,
    expireDate:[], //missing
    nationalId:[], //missing
    birthDate: [],
    daleelId: [] ,
    ministerialId: [] ,
    schoolCode: [] ,
    isSpecialAbilities: [] ,
    isSpecialClass: [] ,
    isChildOfAMartyr : [],
    isPassed : [],
    isGifted: [] ,
    emiratesIdPath: [],
    addressId: [] ,
    behaviorId: [],
    city:[], //missing
    emara:[], //missing
    state:[], //missing
    requiredAmount:[], //missing
    paidAmount:[], //missing
    restAmount:[], //missing
    accountantComment:[], //missing
  })

  studentForm = this.fb.group({
    name:[],
    nickName:[],
    age:[],
    registerd:[],
    allowedDrowBack:[true],
    allowedToproduceCertificate:[false],
    class:[],
    division:[],
    gender:[],
    birthdate:[],
    schoolName:[],
    schoolNumber:[],
    nationalId:[],
    expireDate:[],
    religion:[],
    nationality:[],
    ministrialId:[],
    isAbilites:[],
    isFirst:[],
    city:[],
    emara:[],
    state:[],
    requiredAmount:[],
    paidAmount:[],
    restAmount:[],
    accountantComment:[],
  })

  get f(){ return this.studentForm.controls}


  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private layoutService:LayoutService,
    private fb:FormBuilder,
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')

    // this.studentId = this.route.snapshot.paramMap.get('id')
    // console.log(this.studentId);

    // this.studentsService.getStudent(this.studentId).subscribe(console.log)

  }


  uploadedFiles: File[] = []

  attachedFile(e){
    let file = e.target.files[0];

    if(file) this.uploadedFiles.push(file)
    this.studentsService.sendStudentAttachment({})
  }

  deleteFile(index){
    this.uploadedFiles.splice(index,1)
    this.studentsService.deleteStudentAttachment(this.studentId)
  }

  submitStudentForm(){
    this.studentsService.updateStudent(this.studentId, this.studentFormm.value)
  }
}
