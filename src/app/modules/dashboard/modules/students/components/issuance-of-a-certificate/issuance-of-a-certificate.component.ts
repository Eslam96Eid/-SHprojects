import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { StudentsService } from '../../services/students/students.service';
 
@Component({  
  selector: 'app-issuance-of-a-certificate',
  templateUrl: './issuance-of-a-certificate.component.html',
  styleUrls: ['./issuance-of-a-certificate.component.scss']
})
export class IssuanceOfACertificateComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')
  studentName;
  schoolNames;
  grades;
  certificates;
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 6,
  }





  cities: any[];
  selectedCity: any;
  componentHeaderData: IHeader={
		breadCrump: [
      {label: this.translate.instant('dashboard.students.studentsList'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.Issuing the certificate manually') }
		],
    mainTitle:{main: this.translate.instant('dashboard.students.Issuance of certificate')}
	}

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private std:StudentsService,
    private route: ActivatedRoute
  ) { 
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }
  
  ngOnInit(): void { 
    this.getStudentName();

    this.getCertificates();
    this.getSchoolNames();
    this.getGrades();
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

  getStudentName(){
    this.std.getStudentInfo(this.studentId).subscribe(res=>{
      this.studentName = res.arabicName      
    })
  }

  getSchoolNames(){
    this.std.getAllSchoolNames().subscribe(res=>{
      this.schoolNames = res      
    })
  }
  getGrades(){
    this.std.getAllGrades(this.searchModel).subscribe(res=>{
      this.grades = res.data      
    })
  }
  getCertificates(){
    this.std.getAllCertificate().subscribe(res=>{
      this.certificates = res.data      
    })
  }


}
