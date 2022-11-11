import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-issuance-of-a-certificate',
  templateUrl: './issuance-of-a-certificate.component.html',
  styleUrls: ['./issuance-of-a-certificate.component.scss'],
})
export class IssuanceOfACertificateComponent implements OnInit {
  studentId = +this.route.snapshot.paramMap.get('id');
  studentName;
  schoolNames;
  grades;
  certificates = [];
  rowOfFields = [];
  searchModel = {
    keyword: null,
    sortBy: null,
    page: null,
    pageSize: null,
  };
  // OBJ=[{ signatory1:'', signatory2: '', signatory3: ''}]
  certificateFormGrp: FormGroup;
  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant('dashboard.students.studentsList'),
        routerLink: '/dashboard/schools-and-students/students/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.translate.instant(
          'dashboard.students.Issuing the certificate manually'
        ),
        routerLink: `/dashboard/schools-and-students/students/student/${this.studentId}/IssuanceOfACertificateComponent`,
      },
    ],
    mainTitle: {
      main: this.translate.instant(
        'dashboard.students.Issuance of certificate'
      ),
    },
  };

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private std: StudentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr:ToastrService
  ) {
    this.certificateFormGrp = fb.group({
      studentId: +this.route.snapshot.paramMap.get('id'),
      certificateId: ['',[Validators.required]],
      certificate: this.fb.array([]),
    });
  }

  get certificate(): FormArray {
    return this.certificateFormGrp?.get('certificate') as FormArray;
  }

  addSchool(): void {
    this.certificate.push(this.newSchool());
  }

  newSchool(): FormGroup {
    return this.fb.group({
      schoolId: [null],
      gradeId: [null],
      certificateId: [null],
    });
  }

  ngOnInit(): void {
    this.getStudentName();
    this.getCertificateManually();
    this.getCertificates();
    this.getSchoolNames();
    this.getGrades();
    this.headerService.changeHeaderdata(this.componentHeaderData);
    // this.bindOldIndex(this.OBJ);
  }

  getCertificateManually() {
    this.std.getCetificateManually(this.studentId).subscribe((res) => {
      console.log(res);
      
      if (res && res.length) {
        this.certificate.clear();
        console.log("h");
        
        res.forEach((item, index) => {
          console.log(item);
          
          this.certificate.push(this.newSchool());

          this.certificate.at(index).patchValue({
            gradeId: item.gradeName.id,
            certificateId: item.schoolName.id,
            schoolId: item.schoolYearName.id,
          });

        });
        console.log(this.certificate.value);
        this.certificate.updateValueAndValidity()
        console.log(this.certificateFormGrp.value);
        
      }

      // this.rowOfFields = res;
      // // console.log(this.rowOfFields);
      // this.schools.clear();
      // this.rowOfFields.forEach((item,index) => {
      //   this.addSchool();
      //   console.log(this.rowOfFields);

      //   this.schools
      //     .at(index)
      //     .patchValue(
      //       {
      //         gradeId: item.gradeName.id,
      //         certificateId: item.schoolYearName.id,
      //         schoolId: item.schoolYearName.id
      //       }
      //     );
      // });
    });
  }

  getStudentName() {
    this.std.getStudentInfo(this.studentId).subscribe((res) => {
      this.studentName = res.name.ar;
    });
  }

  getSchoolNames() {
    this.std.getAllSchoolNames().subscribe((res) => {
      this.schoolNames = res;
    });
  }
  getGrades() {
    this.std.getAllGrades().subscribe((res) => {
      this.grades = res.data;
    });
  }
  getCertificates() {
    this.std.getAllCertificate().subscribe((res) => {
      this.certificates = res;
    });
  }

  sendData() {
    console.log(this.certificateFormGrp.value);
    this.std.postCertificate(this.certificateFormGrp.value).subscribe(res=>{
      this.toastr.success('Data Sent Successfully')
    },err => {
      this.toastr.error('Error')
    })
  }
}
