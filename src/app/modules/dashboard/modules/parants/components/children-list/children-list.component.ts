import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { Ichiledren } from 'src/app/core/Models/Ichiledren';
import { Istudent } from 'src/app/core/Models/Istudent';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ParentService } from '../../services/parent.service';



@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss']
})
export class ChildrenListComponent implements OnInit {
  chiledren: Ichiledren[]=[] ;
  students: Istudent[] =[];
  faChevronLeft = faChevronLeft;
  isSkeletonVisible = true;
  items: MenuItem[] = [
    { label: 'اولياء الامور' },
    { label: 'قائمه الابناء' },
  ];

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.parents'),routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.parents.childrenList'),routerLink:'/dashboard/schools-and-students/all-parents/parent/${id}/all-children',routerLinkActiveOptions:{exact: true} }
    ],
    mainTitle: { main: this.translate.instant('dashboard.parents.childrenList'), sub: '(محمد على طارق)' }
  }


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private parentService : ParentService,
    private _router: ActivatedRoute,
    public translationService: TranslationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getChildernByParentId();
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }
  getChildernByParentId(){
    this.parentService.getChildernByParentId(Number(this._router.snapshot.paramMap.get('id'))).subscribe(response => {

      this.chiledren = response.children;
      this.students = response.students;
      console.log(this.chiledren);
      console.log(this.students);
      this.isSkeletonVisible = false;

    },err=> {
      this.isSkeletonVisible=false;
    })
  }

  displayUnregisterChild(chiledId : number){
  
    let parentId = Number(this._router.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dashboard/schools-and-students/all-parents/parent/${parentId}/child/${chiledId}/unregister-child`);
  }
}
