import { Component, OnInit, ViewChild } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';
import { Filter } from 'src/app/core/models/filter/filter';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
// import { paginationState } from 'src/app/core/models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

import { ParentService } from '../../services/parent.service';
// import { ParentService } from '../../services/parent.service';

@Component({
	selector: 'app-parants',
	templateUrl: './parants.component.html',
	styleUrls: ['./parants.component.scss']
})
export class ParantsComponent implements OnInit {
	paginationState= {...paginationInitialState}
	countries$ = this.countriesService.getCountries()
	@ViewChild('dt') table: Table;
	filtration :Filter = {...Filtration,  NationalityId:""}
	faEllipsisVertical = faEllipsisVertical
	//parent: Iparent[] = [];
	parent={
		totalAllData:0,
		total:0,
		list:[],
		loading:true
	  }

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
			{ label: this.translate.instant('dashboard.parents.parents') , routerLink: '/dashboard/schools-and-students/all-parents' ,routerLinkActiveOptions:{exact: true}},
		],
	}

	constructor(
		private exportService: ExportService,
		private translate: TranslateService,
		private headerService: HeaderService,
		private parentService : ParentService,
		private countriesService: CountriesService,
    public loaderService:LoaderService,
    private toastr: ToastrService
	) { }

	getParentList() {
		this.parent.loading=true
		this.parent.list=[]
		this.parentService.getAllParents(this.filtration).subscribe(res => {
if(res.data){

			this.parent.list = res.data
			this.parent.totalAllData = res.totalAllData
			this.parent.total =res.total
      this.parent.loading = false
}
		},err=> {
			this.parent.loading=false
			this.parent.total=0;

		  })
	  }
	ngOnInit(): void {
		this.getParentList();
		this.headerService.changeHeaderdata(this.componentHeaderData)

	}
	onSort(e){
		console.log(e);
		if(e.order==1) this.filtration.SortBy= 'old'
		else if(e.order == -1) this.filtration.SortBy= 'update'
		this.getParentList()
	  }
	paginationChanged(event: paginationState) {
		this.filtration.Page = event.page
		this.first = event.first
		this.rows = event.rows;
		this.getParentList();
	}

	onSearchClear() {
		this.searchKey = '';
		this.applyFilter();
	  }

	  applyFilter() {
		let searchData = this.searchKey.trim().toLowerCase();
		this.getParentList();
	  }

	  onExport(fileType: FileEnum, table:Table){
		this.exportService.exportFile(fileType, table, this.parent.list)
	  }
	  clearFilter(){
		this.filtration.KeyWord =''
		this.filtration.NationalityId= null
		// this.filtration.StateId= null
		// this.filtration.Status =''
		// this.filtration.curricuulumId = null
		this.getParentList()
	  }
    showToastr(childrenCount:any){
      if(childrenCount == 0)
        this.toastr.warning('لا يوجد ابناء ','');
      }
}
