import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable } from 'rxjs';
import { DashboardPanalEnums } from 'src/app/shared/enums/dashboard-panal/dashboard-panal.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';

@Component({
  selector: 'app-dashboard-panal',
  templateUrl: './dashboard-panal.component.html',
  styleUrls: ['./dashboard-panal.component.scss']
})
export class DashboardPanalComponent implements OnInit {

  activRoute$: Observable<DashboardPanalEnums> = this.routeListenrService.activeRoute$


  firstChildHoverd = false
  lastChildHoverd = false


  panalGroups=[

    {
      id: DashboardPanalEnums.SCHOOLS_AND_STUDENTS,
      children:[
        {
          title:'sideBar.schoolsAndStudents.chidren.schools',
          url:'/dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/schools-students/graduation-cap.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.students',
          url:'/dashboard/schools-and-students/students',
          icon:'assets/images/sideBar/schools-students/graduate-student.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.parents',
          url:'/dashboard/schools-and-students/all-parents',
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
      ]
    },

    {
      id: DashboardPanalEnums.PEFORMANCE_MANAGMENT,
      childeren:[
        {
          title:'sideBar.performanceManagment.chidren.exams',
          url:'dashboard/performance-managment/schools',
          icon:'assets/images/sideBar/performance-managment/list.svg'
        },
        {
          title:'sideBar.performanceManagment.chidren.missions',
          url:'dashboard/performance-managment/RequestList/Request-List',
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        }
      ]
    },

    {
      id:DashboardPanalEnums.MANAGAR_TOOLS,
      children:[
        {
          title:'sideBar.managerTools.children.Users',
          url:'/dashboard/manager-tools/user-information/users-list',
          icon:'assets/images/sideBar/system-manager-tools/users.svg'
        },
        {
          title:'sideBar.managerTools.children.Job Roles',
          url:'/dashboard/manager-tools/user-roles/user-roles-list',
          icon:'assets/images/sideBar/system-manager-tools/user.svg'

        },
        {
          title:'sideBar.managerTools.children.System List',
          url:'/dashboard/manager-tools/indexes/indexes-list',
          icon:'assets/images/sideBar/system-manager-tools/list.svg'
        },
        {
          title:'sideBar.managerTools.children.systemSettings',
          url:'/dashboard/manager-tools/',
          icon:'assets/images/sideBar/system-manager-tools/fix.svg'
        }
      ]
    },

    {
      id: DashboardPanalEnums.REPORTS_MANAGEMENT,
      children:[
        {
          title:'تقرير الطلاب',
          icon:'assets/images/sideBar/report-managment/report-user.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير اولاياء الأمور',
          icon:'assets/images/sideBar/report-managment/report.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير الغياب والحضور',
          icon:'assets/images/sideBar/report-managment/report-edge.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير المدارس',
          icon:'assets/images/sideBar/report-managment/report-marked.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير الدرجات',
          icon:'assets/images/sideBar/report-managment/report-content.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير الموظفين',
          icon:'assets/images/sideBar/report-managment/report-user.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير المعلمين',
          icon:'assets/images/sideBar/report-managment/report-marked.svg',
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير المواد الدراسيه',
          icon:'assets/images/sideBar/report-managment/report-line.svg',
          url:'/dashboard/reports-managment'
        },
      ]
    },

    {
      id:DashboardPanalEnums.EDUCATIONAL_SETTING,
      children:[
        {
          title:'sideBar.educationalSettings.children.Annual Holidays',
          url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',
          icon:'assets/images/sideBar/educational-setting/calender.svg'
        },
        {
          title:'sideBar.educationalSettings.children.School Years',
          url:'/dashboard/educational-settings/school-year/school-years-list',
          icon:'assets/images/sideBar/educational-setting/calender-user.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects',
          url:'/dashboard/educational-settings/subject/subjects-list',
          icon:'assets/images/sideBar/educational-setting/micro.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects Assessments',
          url:'/dashboard/educational-settings/assessments/assements-list',
          icon:'assets/images/sideBar/educational-setting/note-marked.svg'

        },

        {
          title:'sideBar.educationalSettings.children.surveysList',
          url:'/dashboard/educational-settings/surveys',
          icon:'assets/images/sideBar/educational-setting/note.svg'

        },

      ]

    }

  ]


  constructor(
    private translate:TranslateService,
    private routeListenrService:RouteListenrService) { }

  ngOnInit(): void {

  }

  onFirstChildHoverd(){
    console.log('hoverd');

    this.firstChildHoverd = true
  }

  onFirstChildLeaved(){
    console.log('leave');

      this.firstChildHoverd = false
  }

  onLastChildHoverd(){
    this.lastChildHoverd = true
  }

  onLastChildLeaved(){

    this.lastChildHoverd = false
  }

}
