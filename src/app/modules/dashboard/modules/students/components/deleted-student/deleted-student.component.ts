
import { Component, OnInit, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
@Component({
  selector: 'app-deleted-student',
  templateUrl: './deleted-student.component.html',
  styleUrls: ['./deleted-student.component.scss']
})
export class DeletedStudentComponent implements OnInit {

  componentHeaderData:IHeader = {
    breadCrump: [
      { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.students.deletStudentFromSchool') }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.deletStudentFromSchool'), sub: '(محمود عامر)' }
  }


  // << FORMS >> //
  deleteStudentForm = this.fb.group({
    caues: [],
    media:[]
  })

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

  uploadedFiles: File[] = []

  uploadFile(e) {
    let file = e.target.files[0];

    if (file) this.uploadedFiles.push(file)
  }

  deleteFile(index) {
    this.uploadedFiles.splice(index, 1)
  }


  onFileUpload(e){}
}
