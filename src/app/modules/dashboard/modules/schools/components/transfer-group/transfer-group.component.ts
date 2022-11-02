import { Component, OnInit } from '@angular/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-transfer-group',
  templateUrl: './transfer-group.component.html',
  styleUrls: ['./transfer-group.component.scss']
})
export class TransferGroupComponent implements OnInit {
  
  
  searchText=''
  selectedStudents=[]
  componentHeaderData: IHeader = {
		breadCrump: [
			{ label: 'قائمه المدارس ' , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
			{ label: 'ارسال طلب نقل جماعي', routerLink: `/dashboard/schools-and-students/schools/transfer-students`},
		],
	}
  constructor(private headerService:HeaderService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

}
