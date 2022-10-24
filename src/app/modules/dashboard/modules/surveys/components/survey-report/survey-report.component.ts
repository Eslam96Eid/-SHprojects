import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.scss']
})
export class SurveyReportComponent implements OnInit {

  faCheck = faCheck

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات' ,routerLink:'/dashboard/educational-settings/surveys',routerLinkActiveOptions:{exact: true}},
      { label: 'تفاصيل الاستبيان',routerLink:'/dashboard/educational-settings/surveys/survey-details',routerLinkActiveOptions:{exact: true} }],
      mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
  }

  schoolClasses: any[] = [

    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },

  ]
  onTabOpen(e) {
    var index = e.index;
}

  surveyQuestions = [
    {
      text: 'هل المدرسة تدعم المنهج البريطاني؟',
      type: 'اختيار من متعدد ',
      options: [{ value: 'A', percentage: '70' }, { value: 'B', percentage: '40' }, { value: 'C', percentage: '20' }, { value: 'D', percentage: '50' }],

    },
    // {
    //   text: 'هل طلاب راضين عند اداء المدرسي؟',
    //   type: 'نصى',
    //   options: [{ value: 'نعم راضين', percentage: '70' }, { value: 'لا تعليق', percentage: '30' }, { value: 'لست راضى عن الاداء', percentage: '10' }],

    // },
    // {
    //   text: 'هل المدرسة تقبل ذوى الاحتياجات الخاصه',
    //   type: 'متعدد',
    //   options: [{ value: 'نعم', percentage: '70' }, { value: 'لا', percentage: '40' }],

    // },
  ]
  surveyQuestions2 = [

    {
      text: 'هل طلاب راضين عند اداء المدرسي؟',
      type: 'اختيار من متعدد ',
      options: [{ value: 'نعم راضين', percentage: '70' }, { value: 'لا تعليق', percentage: '30' }, { value: 'لست راضى عن الاداء', percentage: '10' }],

    },
    {
      text: 'هل المدرسة تقبل ذوى الاحتياجات الخاصه',
      type: 'اختيار من متعدد ',
      options: [{ value: 'نعم', percentage: '70' }, { value: 'لا', percentage: '40' }],

    },
  ]

  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')
  }

  paginationChanged(e) {

  }

}
