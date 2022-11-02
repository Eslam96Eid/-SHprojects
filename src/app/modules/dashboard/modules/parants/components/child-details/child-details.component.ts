import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss']
})
export class ChildDetailsComponent implements OnInit {

  faArrowRight = faArrowRight
  faCheck = faCheck
  faClose = faClose

  step = 1
  regestered:false
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:'/dashboard/schools-and-students/all-parents/parent/:id/all-children',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.parents.sonDetails') }

    ],
    mainTitle: { main: this.translate.instant('dashboard.parents.sonDetails') }
  }


  student =
    {
      name: 'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    }



  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.layoutService.changeTheme('dark')

    this.headerService.changeHeaderdata(this.componentHeaderData)

  }
}
