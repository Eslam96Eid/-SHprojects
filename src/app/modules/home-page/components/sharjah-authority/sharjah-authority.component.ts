import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sharjah-authority',
  templateUrl: './sharjah-authority.component.html',
  styleUrls: ['./sharjah-authority.component.scss']
})
export class SharjahAuthorityComponent implements OnInit {
  faAngleLeft= faAngleLeft
  faAngleRight=faAngleRight
  
  cards=[
    {
      header:{
        label:'مدارس وطلاب',
        icon: 'assets/images/home/schools-students/graduation-cap.svg',
        iconBgColor:'rgba(30, 184, 213,0.12)'
      },
      list: [
        {label:'المدارس', icon:'assets/images/home/schools-students/graduation-cap.svg', url:'/dashboard/schools-and-students/schools'},
        {label:'الطلاب', icon:'assets/images/home/schools-students/user-graduate.svg'},
        {label:'اولياء الامور', icon:'assets/images/home/schools-students/parents.svg'},
      ]
    },

    {
      header:{
        label:' اداره الاداء',
        icon: 'assets/images/home/performance-managment/performance.svg',
        iconBgColor:'rgba(146, 190, 51,0.12)'
      },
      list: [
        {label:'الامتحانات', icon:'assets/images/home/performance-managment/list.svg'},
        {label:'مهامى', icon:'assets/images/home/performance-managment/note-list.svg'},
      ]
    },

    {
      header:{
        label:'الاعدادات التعليميه',
        icon: 'assets/images/home/educational-setting/setting.svg',
        iconBgColor:'rgba(253, 125, 113,0.12)'
      },
      list: [
        {label:'الاجازات السنويه', icon:'assets/images/home/educational-setting/calender.svg',url:'dashboard/AnnualHoliday/ViewSpecific/:SID'},
        {label:'السنوات الدراسيه', icon:'assets/images/home/educational-setting/calender-user.svg'},
        {label:'المواد الدراسيه', icon:'assets/images/home/educational-setting/micro.svg',url:'dashboard/Subjects/ViewSubjectList'},
        {label:'قائمه الاستبيانات', icon:'assets/images/home/educational-setting/note-list.svg'},
        {label:'تقيمات المواد الدراسيه', icon:'assets/images/home/educational-setting/note-marked.svg'},
      ]
     
    },

    {
      header:{
        label:'ادوات مدير النظام',
        icon: 'assets/images/home/system-manager-tools/actions.svg',
        iconBgColor:'rgba(254, 191, 117,0.12)'
      },
      list: [
        {label:'المستخدمين', icon:'assets/images/home/system-manager-tools/users.svg'},
        {label:'الادوار الوظيفيه', icon:'assets/images/home/system-manager-tools/user.svg'},
        {label:'اعدادات النظام ', icon:'assets/images/home/system-manager-tools/fix.svg'},
        {label:'قوائم النظام', icon:'assets/images/home/system-manager-tools/list.svg'},
      ]
      
    },

    {
      header:{
        label:'اداره التقارير',
        icon: 'assets/images/home/report-managment/flag.svg',
        iconBgColor:'rgba(213, 88, 145,0.12)'
      },
      list: [
        {label:'تقرير الطلاب', icon:'assets/images/home/report-managment/report-user.svg'},
        {label:'تقرير اولاياء الأمور', icon:'assets/images/home/report-managment/report.svg'},
        {label:'تقرير الغياب والحضور', icon:'assets/images/home/report-managment/report-edge.svg'},
        {label:'تقرير المدارس', icon:'assets/images/home/report-managment/report-marked.svg'},
        {label:'تقرير الدرجات', icon:'assets/images/home/report-managment/report-content.svg'},
        {label:'تقرير الموظفين', icon:'assets/images/home/report-managment/report-user.svg'},
        {label:'تقرير المعلمين ', icon:'assets/images/home/report-managment/report-line.svg'},
        {label:'تقرير المواد الدراسيه', icon:'assets/images/home/report-managment/list.svg'},
      ]
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
