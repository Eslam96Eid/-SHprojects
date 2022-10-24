import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

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
        {label:'الاجازات السنويه', icon:'assets/images/home/educational-setting/calender.svg'},
        {label:'السنوات الدراسيه', icon:'assets/images/home/educational-setting/calender-user.svg'},
        {label:'المواد الدراسيه', icon:'assets/images/home/educational-setting/micro.svg'},
      ]
    },

    {
      header:{
        label:'ادوات مدير النظام',
        icon: 'assets/images/home/system-manager-tools/actions.svg',
        iconBgColor:'rgba(254, 191, 117,0.12)'
      },
      list: [
        {label:'الموظفين', icon:'assets/images/home/system-manager-tools/users.svg'},
        {label:'ارسال الطلبات', icon:'assets/images/home/system-manager-tools/pull-request.svg'},
      ]
      
    },

    {
      header:{
        label:'اداره التواصل',
        icon: 'assets/images/home/comunication-managment/conversation.svg',
        iconBgColor:'rgba(42, 122, 191,0.12)'
      },
      list: [
        {label:'التواصل مع الهئه', icon:'assets/images/home/comunication-managment/manager.svg'},
        {label:'التواصل مع مدير النطام', icon:'assets/images/home/comunication-managment/parents.svg'},

      ]
    },
    {
      header:{
        label:'معلومات المدرسه',
        icon: 'assets/images/home/school-info/school.svg',
        iconBgColor:'rgba(142, 148, 196,0.12)'
      },
      list: [
        {label:'الصفوف', icon:'assets/images/home/school-info/students.svg'},
        {label:'الشعب', icon:'assets/images/home/school-info/earth.svg'},

      ]
    },

  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
