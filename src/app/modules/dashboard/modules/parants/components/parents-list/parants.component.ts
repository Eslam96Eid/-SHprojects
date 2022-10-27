import { Component, OnInit, ViewChild } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
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
	@ViewChild('dt') table: Table;
	faEllipsisVertical = faEllipsisVertical
	parent: Iparent[] = [];
	totalItem :number;
	first = 0;
	rows = 4;
	isLoaded = false;
	searchKey: string = '';
	// breadCrumb
	items: MenuItem[] = [
		{ label: 'اولياء الامور' },

	];

	componentHeaderData: IHeader = {
		breadCrump: [
			{ label: this.translate.instant('dashboard.parents.parents') },
		],
	}

	constructor(
		private translate: TranslateService,
		private headerService: HeaderService,
		private parentService : ParentService
	) { }

	getParentList(search: string , sortby : string ,pageNum: number, pageSize: number, sortColumn: string, sortDir: string) {
		this.parentService.getAllParents(search,sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {
			debugger
		  this.parent = response?.data;
		  this.totalItem=response.total;
		  this.isLoaded=true;
		})
	  }
	ngOnInit(): void {
		this.getParentList('','',1, 6, '', '');
		this.headerService.changeHeaderdata(this.componentHeaderData)

	}
	paginationChanged(event: paginationState) {
		this.first = event.first
		this.rows = event.rows;
		this.getParentList('','',event.page, 6, '', '');
	}

	onSearchClear() {
		this.searchKey = '';
		this.applyFilter();
	  }
	
	  applyFilter() {
		let searchData = this.searchKey.trim().toLowerCase();
		this.getParentList(searchData, '', 1, 6, '', "asc");
	  }

	  onclick(event :any){
		debugger;
	  }

}
