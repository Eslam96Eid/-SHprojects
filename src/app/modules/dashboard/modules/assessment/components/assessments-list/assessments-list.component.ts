import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { faAngleLeft, faAngleRight, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import { IAssesment } from 'src/app/core/models/iassesment';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

import { AssessmentService } from '../../service/assessment.service';
import { IHeader, paginationState } from 'src/app/core/Models';
import { IRate } from '../edit-new-assessment/edit-new-assessment.model';
@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  assessmentList: IAssesment[] = [];
  first = 0;
  rows = 4;
  cities: string[];
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  plusIcon = faPlus;
  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),routerLink:'/dashboard/educational-settings/assessments/assements-list/',routerLinkActiveOptions:{exact: true}}],

  };
  rateList: Array<IRate> = [];


  constructor(private headerService: HeaderService,
    private assessmentService: AssessmentService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getRate();
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }

  gotoAddAssessment() {
    this.router.navigate(['/dashboard/educational-settings/assessments/new-assessment']);
  }

  navigateToEditAssessment(id: number): void {
    this.router.navigateByUrl(`/dashboard/educational-settings/assessments/edit-assessment/${id}`);
  }

  private getRate(): void {
    this.assessmentService.getRates().subscribe((res) => {
      if (res) {
        this.rateList = res;
      }
    });
  }
}
