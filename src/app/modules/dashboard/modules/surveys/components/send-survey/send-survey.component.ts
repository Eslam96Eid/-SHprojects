import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MenuItem, SelectItem,PrimeNGConfig } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})
export class SendSurveyComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  // userlist: parentsList[];
  selectedUser:'';

  faCheck = faCheck
  faArrowRight = faArrowRight
  faArrowLeft = faArrowLeft
  parentsModelOpened = false
  SendServeyModelOpened = false
  display: boolean = false;
  diseases=[{name:' كمال عادل'},{name:'محمد احمد'},{name:'مارك جمال'},{name:'الوليد احمد'}];
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات ' ,routerLink:'/dashboard/educational-settings/surveys',routerLinkActiveOptions:{exact: true}},
      { label: 'تفاصيل الاستبيان',routerLink:'/dashboard/educational-settings/surveys/survey-details',routerLinkActiveOptions:{exact: true} }],
      mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
  }

  step = 1


  parentsList = [
    {
      id: '#1',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#2',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#3',
      firstName: "كمال",
      lastName: 'حسن',
    },
    {
      id: '#4',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#5',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#6',
      firstName: "أشرف",
      lastName: 'عماري',
    },
  ]
  selectedParents = [
    {
      id: '#813155',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#813155',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#813155',
      firstName: "كمال",
      lastName: 'حسن',
    },

  ]


  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private primengConfig:PrimeNGConfig,
    private fb:FormBuilder
  ) {

    }

  ngOnInit(): void {

    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('breadcrumb.surveyList'),routerLink:'/dashboard/educational-settings/surveys' ,routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.surveys.sendSurvey')}],
        mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
      }
    );
    this.dropdownList = [
      { item_id: 1, item_text: 'كمال' },
      { item_id: 2, item_text: 'احمد' },
      { item_id: 3, item_text: 'محمود' },
      { item_id: 4, item_text: 'ياسر' },
      { item_id: 5, item_text: 'ماركو' },
      { item_id: 6, item_text: 'كميل' },
      { item_id: 7, item_text: 'جون' },
      { item_id: 8, item_text: 'عبدالرحمن' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'محمود' },
      { item_id: 4, item_text: 'ياسر' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'عدم تحديد الكل',
      itemsShowLimit: 5,
      // allowSeachFilter: true
   }

  }


     // << FORMS >> //
     medicalFileForm= this.fb.group({

      chronicDiseases: [[{name: 'محمد احمد'},{name:'كمال عادل'}]],

    })
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addParents() {
    this.parentsModelOpened = false
  }

  selectedDate(e) {
    console.log(e);

  }

  openparentsModel() {
    this.parentsModelOpened = true
  }
  openSendServeysModel() {
    this.SendServeyModelOpened = true
  }


  showDialog() {
      this.display = true;
  }
}
