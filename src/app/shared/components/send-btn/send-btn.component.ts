import { AssignmentServiceService } from './../../../modules/dashboard/modules/assignments/service/assignment-service.service';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
// import { UserService } from 'src/app/core/services/user.service';


import { IuploadAssignment } from 'src/app/core/Models/IuploadAssignment';
import { IAccountAddOrEdit } from 'src/app/core/Models/IAccountAddOrEdit';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.scss']
})
export class SendBtnComponent implements OnInit {
  @Input('route') routeUrl='';
  @Input('typeOfAdd') typeOfAdd='';
  @Input('content') content:FormGroup;
  @Input('backGroundColor') backGroundColor='';
  plusIcon = faPlus;
  checkIcon = faCheck;
  isBtnLoading: boolean=false;
  accountModel : IAccountAddOrEdit= <IAccountAddOrEdit>{};
  assignmentModel : IuploadAssignment= <IuploadAssignment>{};

  currentDate = new Date();


  constructor(private _router: ActivatedRoute,private router: Router,private route:ActivatedRoute ,
    private userService : UserService, private translate: TranslateService,
    private assignmentService : AssignmentServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  goToAddNew()
  {
    let typeOfAdd = this.typeOfAdd.toString();
    switch(typeOfAdd) {
      case 'AddOrEditUser': {
        this.AddOrEditAccount();
         break;
      }
      case 'uploadAssignment': {
        this.UploadAssignment();
         break;
      }
      default: {

         break;
      }

   }
   this.router.navigate([this.routeUrl],{relativeTo:this.route});
  }
  AddOrEditAccount(){
    let id = this._router.snapshot.paramMap.get('userId');
    if(id == null){
      this.accountModel.claim = '';
      this.accountModel.hasAzureADAccount = false;
      this.accountModel.fullName = this.content.value.fullName;
      this.accountModel.phoneNumber = this.content.value.phoneNumber;
      this.accountModel.email = this.content.value.email;
      this.accountModel.arabicSurname = "";
      this.accountModel.englishSurname =this.content.value.fullName;
      this.accountModel.jobTitle = "test";
      this.accountModel.gender = '';
      this.accountModel.birthDate = "2022-10-23T09:09:09.825Z",
      this.accountModel.emiratesIdPath = "";
      this.accountModel.employeeIdNumber = "";
      this.accountModel.permissionToEnterScore = true;
      this.accountModel.relativeRelationId= 0;
      this.accountModel.scope= "SPEA";
      this.accountModel.isActive= this.content.value.userStatus;
      this.accountModel.nickName = this.content.value.nickName;
      this.accountModel.emiratesIdNumber =this.content.value.identityNumber;
      this.accountModel.password = this.content.value.password;
      this.accountModel.status = 'Active';
      this.accountModel.roles = [];
      this.accountModel.nationalityId = '';
      this.accountModel.roles.push(Number(this.content.value.privateRole.id));

      console.log(this.accountModel)
      // this.content.value.privateRole.forEach(element => {
      //   this.accountModel.roles.push(Number(element.id));
      // });
      this.userService.AddAccount(this.accountModel).subscribe(res => {
      console.log(res);
      this.toastr.success(this.translate.instant('Add Successfully'),'');
     });
    }
    else{
      this.accountModel.id =Number(id);
      this.accountModel.claim = '';
      this.accountModel.hasAzureADAccount = false;
      this.accountModel.fullName = this.content.value.fullName;
      this.accountModel.phoneNumber = this.content.value.phoneNumber;
      this.accountModel.email = this.content.value.email;
      this.accountModel.arabicSurname = "";
      this.accountModel.englishSurname =this.content.value.fullName;
      this.accountModel.jobTitle = "test";
      this.accountModel.gender = '';
      this.accountModel.birthDate = "2022-10-23T09:09:09.825Z",
      this.accountModel.emiratesIdPath = "";
      this.accountModel.employeeIdNumber = "";
      this.accountModel.permissionToEnterScore = true;
      this.accountModel.relativeRelationId= 0;
      this.accountModel.scope= "SPEA";
      this.accountModel.isActive= this.content.value.userStatus;
      this.accountModel.nickName = this.content.value.nickName;
      this.accountModel.emiratesIdNumber =this.content.value.identityNumber;
      this.accountModel.password = this.content.value.password;
      this.accountModel.status = 'Active';
      this.accountModel.roles = [];
      this.accountModel.nationalityId = '';
      this.accountModel.roles.push(Number(this.content.value.privateRole.id));
      // this.content.value.privateRole.forEach(element => {
      //   this.accountModel.roles.push(Number(element.id));
      // });
    //   this.userService.AddAccount(this.accountModel).subscribe(res => {
    //   console.log(res);
    //  });

       this.userService.EditAccount(this.accountModel).subscribe(res => {
       console.log(res);
       this.toastr.success(this.translate.instant('Updated Successfully'),'');
      });
    }
  }

  UploadAssignment(){
    this.assignmentModel.arabicName = this.content.value.ExamName ;
    this.assignmentModel.englishName= this.content.value.ExamName ;
    let _examDuration = `00:${this.content.value.ExamDuration}:00 `;
    this.assignmentModel.examduration = _examDuration;
    this.assignmentModel.examShowTime = "00:08:00";
    const date = new Date(this.content.value.ExamDate);
    this.assignmentModel.examShowDate= date.toISOString().slice(0,10);
    this.assignmentModel.gradeId = this.content.value.grades.id;
   // this.assignmentModel.subjectId= this.content.value.subjects.id;
    this.assignmentModel.subjectId= 4;
    this.assignmentModel.curriculumId= this.content.value.curriculum.id;

    if (this.assignmentModel.examShowDate.slice(0, 10) === formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')) {
      this.assignmentModel.examStatus=1;
    } else {
      this.assignmentModel.examStatus=2;
    }

    this.assignmentModel.examPdfPath = this.content.value.examPdfPath ;
    this.assignmentModel.examAudioPath = this.content.value.examAudioPath ;
    this.assignmentService.AddAssignment(this.assignmentModel).subscribe(res => {
      console.log(res);
      this.toastr.success('Add Successfully','');
     });
  }
  goToCancle(){
    this.router.navigate([this.routeUrl],{relativeTo:this.route});
  }
}
