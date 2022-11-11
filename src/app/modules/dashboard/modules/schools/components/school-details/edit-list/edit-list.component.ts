import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  // @Input('editList') editList=[]

  faChevronCircleLeft = faChevronLeft

  
  first = 0
  rows = 4

  filtration={...Filtration}
  paginationState={...paginationInitialState}

  editList={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  openEditListModel=false
  
  constructor(
    private schoolsService:SchoolsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
this.getEditList()
  }

  getEditList(){
    this.editList.loading=true
    this.editList.list=[]
    this.schoolsService.getSchoolEditList(this.filtration).subscribe(res =>{
      this.editList.loading = false
      this.editList.list = res.data || []
      this.editList.totalAllData = res.totalAllData ||0
      this.editList.total =res.total || 0
    },(err)=>{
      this.editList.loading = false
     })
  }


  
  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
     this.getEditList()
   }

   clearFilter(){
     this.filtration.KeyWord =''
     this.getEditList()
   }


  //  onExport(fileType: FileEnum, table:Table){
  //    this.exportService.exportFile(fileType, table, this.divisions.list)
  //  }

   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getEditList()

   }
}
