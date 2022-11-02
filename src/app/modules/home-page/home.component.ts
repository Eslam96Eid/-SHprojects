import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { UserEnum } from 'src/app/shared/enums/user.enum';

@Component({
  selector: 'app-current-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  faChevronDown= faChevronDown
  faChevronUp=faChevronUp
  userType= UserEnum.U_SHARJAH_AUTHORITY
  searchText


  cardsContentStatus=[
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
  ]

  cardsHoverStatus=[
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
  ]

  get userEnum() { return UserEnum}

  cards=[
    {
      image:'assets/images/home/educational-setting.png',
      content:{
        header: {
          title:"الاعدادات التعليميه",
          bgColor:'#EF8071'
        },
        list: [
          {label:'الاجازات السنويه', icon:'assets/images/home/educational-setting/calender.svg',url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list'},
          {label:'السنوات الدراسيه', icon:'assets/images/home/educational-setting/calender-user.svg',url:'/dashboard/educational-settings/school-year/school-years-list'},
          {label:'المواد الدراسيه', icon:'assets/images/home/educational-setting/micro.svg',url:'/dashboard/educational-settings/subject/subjects-list'},
          {label:'قائمه الاستبيانات', icon:'assets/images/home/educational-setting/note-list.svg', url:'/dashboard/educational-settings/surveys'},
          {label:'تقيمات المواد الدراسيه', icon:'assets/images/home/educational-setting/note-marked.svg',url:'/dashboard/educational-settings/assessments/assements-list'},
        ]
      }

    },

    {
      image:'assets/images/home/reports-managment.png',
      content:{
        header: {
          title: 'اداره التقارير',
          bgColor:'#CD578A'
        },
        list: [
          {label:'تقرير الطلاب', icon:'assets/images/home/report-managment/report-user.svg'},
          {label:'تقرير اولاياء الأمور', icon:'assets/images/home/report-managment/report.svg'},
          {label:'تقرير الغياب والحضور', icon:'assets/images/home/report-managment/report-edge.svg'},
          {label:'تقرير المدارس', icon:'assets/images/home/report-managment/report-marked.svg'},
          {label:'تقرير الدرجات', icon:'assets/images/home/report-managment/report-content.svg'},
        ]
      }
    },

    {
      image:'assets/images/home/schools-and-students.png',
      content:{
        header: {
          title:'مدارس وطلاب',
          bgColor:'#5CD0DF'
        },
        list: [
          {label:'المدارس', icon:'assets/images/home/schools-students/graduation-cap.svg', url:'/dashboard/schools-and-students/schools'},
          {label:'الطلاب', icon:'assets/images/home/schools-students/user-graduate.svg'},
          {label:'اولياء الامور', icon:'assets/images/home/schools-students/parents.svg'},
        ]
      }
    },

    {
      image:'assets/images/home/manager-tools.png',
      content:{
        header: {
          title: 'ادوات مدير النظام',
          bgColor:'#D644B1'
        },
        list: [
          {label:'المستخدمين', icon:'assets/images/home/system-manager-tools/users.svg',url:'/dashboard/manager-tools/user-information/users-list'},
          {label:'الادوار الوظيفيه', icon:'assets/images/home/system-manager-tools/user.svg', url:'/dashboard/manager-tools/user-roles/user-roles-list'},
          {label:'اعدادات النظام ', icon:'assets/images/home/system-manager-tools/fix.svg',url:'/dashboard/managerTools/'},
          {label:'قوائم النظام', icon:'assets/images/home/system-manager-tools/list.svg',url:'/dashboard/manager-tools/indexes/indexes-list'},
        ]
      }
    },

    {
      image:'assets/images/home/performance-managment.png',
      content:{
        header: {
          title:'اداره الاداء',
          bgColor:'#F8C073'
        },
        list: [
          {label:'الامتحانات', icon:'assets/images/home/performance-managment/list.svg'},
          {label:'مهامى', icon:'assets/images/home/performance-managment/note-list.svg',url:'/dashboard/performance-managment/RequestList/Request-List'},
        ]
      }

    },



  ]

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onHoverd(index){
    this.cardsHoverStatus[index].active = true
  }

  onLeaved(index){
    this.cardsHoverStatus[index].active = false
    this.cardsContentStatus[index].active = false
  }

}
