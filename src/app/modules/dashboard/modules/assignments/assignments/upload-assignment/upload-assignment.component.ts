import { AssignmentServiceService } from './../../service/assignment-service.service';
import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Icurriculum } from 'src/app/core/Models/Icurriculum';
import { Ischool } from 'src/app/core/Models/Ischool';
import { Igrade } from 'src/app/core/Models/Igrade';
import { ISubject } from 'src/app/core/Models/isubject';
@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.scss']
})
export class UploadAssignmentComponent implements OnInit {
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  calendericon = faCalendar;
  checkIcon = faCheck;
  displayMaximizable: boolean;
  rightIcon = faArrowRight;
  date3: Date;
  minDateValue=new Date();
  assignmentFormGrp: FormGroup;
  CurriculumSelected: Icurriculum;
  SchoolSelected: Ischool;
  GradeSelected: Igrade;
  SubjectSelected: ISubject;
  schools: Ischool[] = [];
  curriculumId:number;
  grades: Igrade[] = [];
  subjects: ISubject[] = [];
  curriculums: Icurriculum[] = [];
//attachment
  attachmentList = [];

  files: any = [];

  attachmentsName=[];
  @Output() onFileDropped = new EventEmitter<any>();



  @HostBinding('style.background-color') private background = '#f5fcff'

  @HostBinding('style.opacity') private opacity = '1'



  //Dragover listener

  @HostListener('dragover', ['$event']) onDragOver(evt) {

    evt.preventDefault();

    evt.stopPropagation();

    this.background = '#9ecbec';

    this.opacity = '0.8'

  }



  //Dragleave listener

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {

    evt.preventDefault();

    evt.stopPropagation();

    this.background = '#f5fcff'

    this.opacity = '1'

  }



  //Drop listener

  @HostListener('drop', ['$event']) public ondrop(evt) {

    evt.preventDefault();

    evt.stopPropagation();

    this.background = '#f5fcff'

    this.opacity = '1'

    let files = evt.dataTransfer.files;

    if (files.length > 0) {

      this.onFileDropped.emit(files)

    }

  }
//////////////
  constructor(private headerService: HeaderService, private router: Router,
     private translate: TranslateService, private fb: FormBuilder, private assignmentService: AssignmentServiceService,
    private messageService: MessageService) {
    this.assignmentFormGrp = fb.group({
      curriculum: [''],
      schools:[''],
      grades:[''],
      subjects:[''],
      ExamName:[''],
      ExamDuration:[''],
      ExamDate:[''],
      ExamTime:[''],
      examPdfPath: [''],
      examAudioPath: ['']
    });
  }

  //#region "Get All List"
  deleteAttachment(index) {

    this.attachmentList.splice(index, 1)

    this.attachmentsName.splice(index,1)

    console.log(this.attachmentList);



  }
  onLogoDeleted(){
		// const file={id:this.schoolId, schoolLogoPath: ''}
		// this.schoolsService.updateSchoolLogo(this.schoolId,file).subscribe()
	}
  upload = (event) => {

    let fileList = event.target.files;

    let fileSize = event.target.files[0].size;

    if(fileSize > 2e+6){

      // this.toastr.error('The File Size Must be Less Than 5MB')

      return;

    }else{

      console.log(fileList);



        [...fileList].forEach((file) => {

      let reader = new FileReader();

      reader.onload = () => {

        let x = reader.result.toString().split(',')[1];

        this.attachmentsName.push(file.name)

        // let data = file.data

        let convertedFile = { url: x };

        this.attachmentList.push(convertedFile);

        this.files.push(convertedFile) // remove it if it error

      };

      reader.readAsDataURL(file);



    console.log(this.attachmentList);

      console.log(this.attachmentsName);



  }

    )}}

 sendMessage(){
      const form ={
//         "userId": Number(localStorage.getItem('$AJ$userId')),
//         "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
//         "guardian": this.schoolEmpForm.value.guardian,
//         "title": this.schoolEmpForm.value.title,
//         "switch1": this.schoolEmpForm.value.switch1,
//         "switch2": this.schoolEmpForm.value.switch2,
//         "description": this.schoolEmpForm.value.description,
//         'attachment': this.attachmentList || null
      }
      console.log(form);

    }


  ///////////////////////////////////////
  getGradeList(){
    this.assignmentService.GetGradeList().subscribe(response => {
		  this.grades = response.data;
		})
  }


  getSubjectList(){
    this.assignmentService.GetSubjectList().subscribe(response => {
		  this.subjects = response.data;
		})
  }

  // getSchoolList() {
  //   this.assignmentService.GetSchoolsList(this.curriculumId).subscribe(response => {
  //     this.schools = response.data;
  //   })
  // }


  getCurriculumList() {
    this.assignmentService.GetCurriculumList('', '', 1, 1000, '', '').subscribe(response => {
      this.curriculums = response.data;
    })
  }

//#endregion "My Region"




  ngOnInit(): void {
    this.getCurriculumList();
   // this.getSchoolList();
    this.getGradeList();
    this.getSubjectList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('breadcrumb.Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } },
          { label: this.translate.instant('breadcrumb.Upload Assignment') , routerLink: '/dashboard/performance-managment/assignments/upload-assignment', routerLinkActiveOptions: { exact: true } }
        ],
        mainTitle: { main: this.translate.instant('breadcrumb.Upload Assignment') }
      }
    );

  }


  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  onChange(event: any ) {
    this.curriculumId = event.value.id;
    // this.getSchoolList();

}
uploadedFiles: any[] = [];
onUpload(event) {
  for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  onFileUpload(res: {url: string; name: string}): void {
    if (res) {
      const extension = res.url.split('.').pop();
      if (extension === 'jpg' || extension === 'png' || extension === 'pdf') {
        this.assignmentFormGrp.patchValue({
          examPdfPath: res.url
        });
      } else if(extension === 'mp3') {
        this.assignmentFormGrp.patchValue({
          examAudioPath: res.url
        });
      }
      console.log('form', this.assignmentFormGrp.value);
    }
    // const requests = [];
    // data.files.forEach(file => {
    //   const formData = new FormData();
    //   formData.append('file', file, file.name);
    //   requests.push(this.assignmentService.onFileUpload(formData));
    // });
    // forkJoin(requests).subscribe((res: Array<{url: string}>) => {
    //   if (res && res.length > 0) {
    //     res.forEach(item => {
    //       const extension = item.url.split('.').pop();
    //       if (extension === 'jpg' || extension === 'png' || extension === 'pdf') {
    //         this.assignmentFormGrp.patchValue({
    //           examPdfPath: item.url
    //         });
    //       } else if(extension === 'mp3') {
    //         this.assignmentFormGrp.patchValue({
    //           examAudioPath: item.url
    //         });
    //       }
    //     });
    //   }
    // });
  }

  onImageOrPdfDeleted(): void {
    this.assignmentFormGrp.patchValue({
      examPdfPath: ''
    });
    console.log('form', this.assignmentFormGrp);
  }

  onAudioDeleted(): void {
    this.assignmentFormGrp.patchValue({
      examAudioPath: ''
    });
    console.log('form', this.assignmentFormGrp);
  }
}
