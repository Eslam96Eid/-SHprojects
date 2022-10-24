import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FileEnum } from '../../enums/file/file.enum';

@Component({
  selector: 'app-table-caption',
  templateUrl: './table-caption.component.html',
  styleUrls: ['./table-caption.component.scss']
})
export class TableCaptionComponent implements OnInit, OnDestroy {
  @Input('hasFilter') hasFilter:boolean=true

  @Output() onExport = new EventEmitter();
  @Output() onSearch = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onClear = new EventEmitter();

  ngUnSubscribe =new Subject()

  showExportModel:boolean=false;
  // showFilterBox = false

  showFilterModel=false

  filterForm
  
  searchInput = new FormControl('')

  constructor(private fb:FormBuilder) { }


  ngOnInit(): void {

    this.seachListener()
  }


  seachListener(){
    this.searchInput.valueChanges
    .pipe(
      debounceTime(1200),
      distinctUntilChanged(),
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe(val =>{
      this.onSearch.emit(val);
    })
  }

  onFilterActivated(){
    this.showFilterModel=!this.showFilterModel
    this.onFilter.emit()
    
  }

  clearFilter(){this.showFilterModel = false; this.onClear.emit()}

  exportCsv() { this.onExport.emit(FileEnum.CSV)}

  exportXslx(){ this.onExport.emit(FileEnum.XLSX) }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next(null)
    this.ngUnSubscribe.complete()
  }
}
