import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentService } from '../../../parants/services/parent.service';
// import { IunregisterChild } from '../../models/IunregisterChild';


@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {

  @Input() label = ' انقر لإرفاق ملف'

  step=1
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات '  },
    ],
  }
  student =
  {
    name: 'محمد على',
    age: 15,
    regestered: false,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school: 'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation: 'ابن الاخ',
    src: 'assets/images/requestdetails.png'
  }


  events: any[];
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Requests.RequestDetails'),routerLink: '/dashboard/performance-managment/RequestList/Requestdetails'}
        ]}
    );


    this.events = [
      {status: 'Ordered', date: 'assets/images/shared/PDFSEC.svg', color: '#9C27B0', image: 'game-controller.jpg'},
      {status: 'Processing', date: '15/10/2020 14:00', color: '#673AB7'},
      {status: 'Shipped', date: '15/10/2020 16:15',color: '#FF9800'},
      {status: 'Delivered', date: '16/10/2020 10:00', color: '#607D8B'}
  ];

  }

}
