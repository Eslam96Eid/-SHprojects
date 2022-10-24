import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-indexes',
  templateUrl: './indexes-list.component.html',
  styleUrls: ['./indexes-list.component.scss']
})
export class IndexesComponent implements OnInit {
  filtration = {...Filtration,IndexTypeId: '',indexStatus:''};
  indexesList: IIndexs[] = [];
  faEllipsisVertical = faEllipsisVertical;
   first:boolean=true;
  allIndexesLength:number=1;
  fixedLength:number=0;
  indexListType;
  indexStatusList;
  paginationState= {...paginationInitialState};
  indexes={
    total:0,
    list:[],
    loading:true
  }
  constructor(private exportService: ExportService,
    private loaderService:LoaderService,
    private headerService: HeaderService,
    private indexesService: IndexesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {

    this.getAllIndexes();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'),routerLink: '/dashboard/manager-tools/indexes/indexes-list' }],
      }
    );
    this.indexStatusList = this.indexesService.indexStatusList;
    this.indexesService. getIndextTypeList().subscribe((res)=>{this.indexListType=res;})

  }


  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}

    this.getAllIndexes();
  }

  getAllIndexes(){
   console.log(this.filtration);
    this.indexesService.getAllIndexes(this.filtration).subscribe((res)=>{
        this.indexes.loading = false;
      console.log(this.filtration)
     this.allIndexesLength=res.total;
     console.log(res.data);
     if(this.first)
     {
      this.fixedLength=this.allIndexesLength;
      this.indexes.total=this.fixedLength;
    }
     console.log(this.fixedLength)
      this.indexesList=res.data;



      },(err)=>{this.indexes.loading = false;
        this.indexes.total=0
      });


  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.IndexTypeId= null;
    this.filtration.indexStatus= null;
    this.getAllIndexes();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.indexesList)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllIndexes();

  }




}
