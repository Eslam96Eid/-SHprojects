import { Component, OnInit } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/iheader';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
// import { paginationState } from 'src/app/core/models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Iparent } from '../../models/Iparent';
import { ParentService } from '../../services/parent.service';
// import { ParentService } from '../../services/parent.service';

@Component({
	selector: 'app-parants',
	templateUrl: './parants.component.html',
	styleUrls: ['./parants.component.scss']
})
export class ParantsComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical

	// breadCrumb
	items: MenuItem[] = [
		{ label: 'اولياء الامور' },

	];

	componentHeaderData: IHeader = {
		breadCrump: [
			{ label: this.translate.instant('dashboard.parents.parents') },
		],
	}

	schoolClasses: any[] = [

		{
			"id": "1001",
			"code": "nvklal433",
			"name": "Black Watch",
			"description": "Product Description",
			"image": "black-watch.jpg",
			"price": 72,
			"category": "Accessories",
			"quantity": 61,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1001",
			"code": "nvklal433",
			"name": "Black Watch",
			"description": "Product Description",
			"image": "black-watch.jpg",
			"price": 72,
			"category": "Accessories",
			"quantity": 61,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1000",
			"code": "f230fh0g3",
			"name": "Bamboo Watch",
			"description": "Product Description",
			"image": "bamboo-watch.jpg",
			"price": 65,
			"category": "Accessories",
			"quantity": 24,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1001",
			"code": "nvklal433",
			"name": "Black Watch",
			"description": "Product Description",
			"image": "black-watch.jpg",
			"price": 72,
			"category": "Accessories",
			"quantity": 61,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1000",
			"code": "f230fh0g3",
			"name": "Bamboo Watch",
			"description": "Product Description",
			"image": "bamboo-watch.jpg",
			"price": 65,
			"category": "Accessories",
			"quantity": 24,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1001",
			"code": "nvklal433",
			"name": "Black Watch",
			"description": "Product Description",
			"image": "black-watch.jpg",
			"price": 72,
			"category": "Accessories",
			"quantity": 61,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1002",
			"code": "zz21cz3c1",
			"name": "Blue Band",
			"description": "Product Description",
			"image": "blue-band.jpg",
			"price": 79,
			"category": "Fitness",
			"quantity": 2,
			"inventoryStatus": "LOWSTOCK",
			"rating": 3
		},

	]

	first = 0
	rows = 4

	constructor(
		private translate: TranslateService,
		private headerService: HeaderService,
		private parentService : ParentService
	) { }

	parent: Iparent[] = [];
	getParentList(search: string , sortby : string ,pageNum: number, pageSize: number, sortColumn: string, sortDir: string) {
		this.parentService.getAllParents(search,sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {
		  this.parent = response?.data;
		  this.parent.length = response?.pagination.totalCount;
		})
	  }
	ngOnInit(): void {
		this.getParentList('','',1, 25, '', '');
		this.headerService.changeHeaderdata(this.componentHeaderData)

	}
	paginationChanged(event: paginationState) {
		this.first = event.first
		this.rows = event.rows
	}

}
