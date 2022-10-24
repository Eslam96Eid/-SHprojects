import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { DashboardPanalEnums } from 'src/app/shared/enums/dashboard-panal/dashboard-panal.enum';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faArrowLeft= faArrowLeft
  faArrowRight= faArrowRight

  activGroup: DashboardPanalEnums

  sideBarGroups=[

    {
      name: DashboardPanalEnums.SCHOOLS_AND_STUDENTS,
      title: 'sideBar.schoolsAndStudents.title',
      children:[
        {
          title:'sideBar.schoolsAndStudents.chidren.schools',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.students',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/graduation-cap.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.parents',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/parents.svg'
        },
      ]
    },

    {
      title: 'sideBar.performanceManagment.title',
      childeren:[
        {
          title:'sideBar.performanceManagment.chidren',
          url:'dashboard/performance-managment/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },
    
    { 
      name:DashboardPanalEnums.MANAGAR_TOOLS,
      title:'sideBar.managerTools.title',
      children:[
        {
          title:'sideBar.managerTools.children.Users',
          url:'/dashboard/manager-tools/user-information/users-list',
          icon:'assets/images/sideBar/Users.svg'
        },
        {
          title:'sideBar.managerTools.children.Job Roles',
          url:'/dashboard/manager-tools/user-roles/user-roles-list',
          icon:'assets/images/sideBar/JobRole.svg'

        },
        {
          title:'sideBar.managerTools.children.System List',
          url:'/dashboard/manager-tools/indexes/indexes-list',
          icon:'assets/images/sideBar/Indexes.svg'

        }
      ]
    },
    {
      name:DashboardPanalEnums.EDUCATIONAL_SETTING,
      title:'sideBar.educationalSettings.title',
      children:[
        {
          title:'sideBar.educationalSettings.children.Annual Holidays',
          url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list/:schoolId',
          icon:'assets/images/sideBar/AnnualHoliday.svg'
        },
        {
          title:'sideBar.educationalSettings.children.Subjects',
          url:'/dashboard/educational-settings/subject/subjects-list',
          icon:'assets/images/sideBar/Subjects.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects Assessments',
          url:'/dashboard/educational-settings/assessments/assements-list',
          icon:'assets/images/sideBar/Assessment.svg'

        },
        {
          title:'sideBar.educationalSettings.children.School Years',
          url:'/dashboard/educational-settings/school-year/school-years-list',
          icon:'assets/images/sideBar/SchoolYears.svg'

        }
      ]

    }

  ]

  constructor(private router:Router, private translate:TranslateService) { }

  ngOnInit(): void {
    
    let url = this.router.url
    this.routeListner(url)
  }


  routeListner(url? : string){
    if(url) this.checkRouteInclude(url)
    
    this.router.events
    .pipe(filter( event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => this.checkRouteInclude(event.url) )

  }

  
  checkRouteInclude(url: string){

    if(url.indexOf('schools-and-students') > -1){        
      this.activGroup = DashboardPanalEnums.SCHOOLS_AND_STUDENTS

    } else if(url.indexOf('performance-managment') > -1){
      this.activGroup = DashboardPanalEnums.PEFORMANCE_MANAGMENT

    }else if(url.indexOf('educational-settings') > -1){
      this.activGroup = DashboardPanalEnums.EDUCATIONAL_SETTING

    }else if(url.indexOf('manager-tools') > -1){
      this.activGroup = DashboardPanalEnums.MANAGAR_TOOLS

    }else if(url.indexOf('reports-managment') > -1){
      this.activGroup = DashboardPanalEnums.REPORTS_MANAGEMENT
      
    }else if(url.indexOf('communication-managment') > -1){
      this.activGroup = DashboardPanalEnums.COMMUNICATION_MANAGMENT

    }else if(url.indexOf('school-info') > -1){
      this.activGroup = DashboardPanalEnums.SCHOOL_INFO

    }
  }

}
