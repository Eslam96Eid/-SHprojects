import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { IIndexs } from 'src/app/core/Models';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss']
})
export class EditNewIndexComponent implements OnInit {
  exclamationIcon = faExclamationCircle;
  isLabelShown:boolean=false;
  checkedStatus:boolean=true;
  notCheckedStatus:boolean=false;
  isBtnLoading: boolean=false;
  index:IIndexs={} as IIndexs;
  indexListType;
  urlParameter: string='';
  indexFormGrp: FormGroup;
  constructor(private fb: FormBuilder,private toastService: ToastService,private route: ActivatedRoute, private headerService: HeaderService, private router: Router, private translate: TranslateService, private indexService: IndexesService) {
    this.indexFormGrp = fb.group({

      arabicIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      englishIndexName: ['', [Validators.required, Validators.maxLength(500)]],
      indexType: ['', [Validators.required]],
      indexStatus:['']

    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param => {
      this.urlParameter = param.get('indexId');
    });
    console.log(this.urlParameter);
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'), routerLink: '/dashboard/manager-tools/indexes/indexes-list',routerLinkActiveOptions:{exact: true} },
          { 
           
            label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('dashboard.Indexes.Add Item'):this.translate.instant('dashboard.Indexes.Edit Item'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/manager-tools/indexes/new-index':'/dashboard/manager-tools/indexes/edit-index/'+this.urlParameter
          }
       ],
        'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('dashboard.Indexes.Add Item'):this.translate.instant('dashboard.Indexes.Edit Item')}
      }
    );

    this.indexListType=this.indexService.indexListType;

    this.indexService.getIndexByID(Number(this.urlParameter)).subscribe((res)=>{
      
      this.index=res;
 console.log(this.index)
      this.bindOldIndex(this.index);
    });
  
  }
  get arabicIndexName() {
    return this.indexFormGrp.controls['arabicIndexName'];
  }
  get englishIndexName() {
    return this.indexFormGrp.controls['englishIndexName'];
  }

  get indexType() {
    return this.indexFormGrp.controls['indexType'];
  }
  get indexStatus()
  {
    return this.indexFormGrp.controls['indexStatus'];
  }

  
  saveMe(){
    this.isBtnLoading = true;
    this.index.indexStatus=this.indexFormGrp.value.indexStatus==true? "1":"2";
    this.index={  indexName:{ar:this.indexFormGrp.value.arabicIndexName,en:this.indexFormGrp.value.englishIndexName}, 
                  indexType:this.indexFormGrp.value.indexType, 
                  indexStatus: this.index.indexStatus
    };

    if(this.urlParameter)
    {
       this.indexService.updateIndex(Number(this.urlParameter),this.index).subscribe((res)=>{
        this.isBtnLoading = false;
        this.showSuccessedMessage();
        this.router.navigate(['/dashboard/manager-tools/indexes/indexes-list']);
      },(err)=>{this.isBtnLoading = false;this.showErrorMessage();});
    }
    else
    { 
    
      this.indexService.addIndex(this.index).subscribe((res)=>{
          this.isBtnLoading = false;
          this.showSuccessedMessage();
          this.router.navigate(['/dashboard/manager-tools/indexes/indexes-list']);
        },(err)=>{this.isBtnLoading = false;this.showErrorMessage();});
    }
  }
  showSuccessedMessage()
  {
    this.toastService.success(this.translate.instant('dashboard.Indexes.Old System Lists will be changed Based on New edit'));
  }

  showErrorMessage()
  {
    this.toastService.error(this.translate.instant('dashboard.Indexes.You should enter Valid Data First'));
  }

  isToggleLabel(e)
  {
    if(e.checked)
    {
      if(this.urlParameter)
      {
        this.index.indexStatus="Active";
      
      }
      else
      {
        this.isLabelShown=true;
      }
  
    }
    else{
      if(this.urlParameter)
      {
        this.index.indexStatus="Notactive";
     
      }
      else
      {
        this.isLabelShown=false;
      }
     
    }
  }

  bindOldIndex(index)
  {
        index.indexStatus= index.indexStatus=='Active'||index.indexStatus=='1'?this.checkedStatus:this.notCheckedStatus;
 
        this.indexFormGrp.patchValue({arabicIndexName:index.indexName.ar, 
          englishIndexName:index.indexName.en,
          indexType:index.indexType,
          indexStatus:index.indexStatus
        });
    
       
  }

 
 
}
