import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { SchoolsService } from '../../services/schools/schools.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';



@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit,AfterViewInit  {
  lang =inject(TranslationService).lang

  curriculums$ = this.sharedService.getAllCurriculum()
  cities = this.CountriesService.cities
  cities$ = this.CountriesService.getCities()
  states$ = this.CountriesService.getAllStates()

  public userAppData: any;
  public seconduserAppData: any;
  public appUserCount1: any;
  public appUserCount2: any;
  public appUserCount3: any;
  public appUserCount4: any;
  public appUserCount5: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData;


  get StatusEnum() { return StatusEnum }
  filtration :Filter = {...Filtration, Status: null, City:'', curricuulumId:'', StateId: ''}
  paginationState= {...paginationInitialState}

  schoolStatus = this.sharedService.statusOptions

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه المدارس ' ,routerLink: '/dashboard/schools-and-students/schools'},
    ],
  }

  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }


  employeeOrgData; orgCount1;
  orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
  employeeJIRAHoursData;


  constructor(
    private headerService: HeaderService,
    private exportService: ExportService,
    private schoolsService:SchoolsService,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    public loaderService:LoaderService
  ) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getSchools()
  }


  getSchools(){
    this.schools.loading=true
    this.schools.list=[]
    this.schoolsService.getAllSchools(this.filtration).subscribe((res)=>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total

    },err=> {
      this.schools.loading=false
      this.schools.total=0
    })
  }



  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSchools()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.City= null
    this.filtration.StateId= null
    this.filtration.Status =null
    this.filtration.curricuulumId = null
    this.getSchools()
  }


  onExport(fileType: FileEnum, table:Table){
    this.exportService.exportFile(fileType, table, this.schools.list)
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }
}
