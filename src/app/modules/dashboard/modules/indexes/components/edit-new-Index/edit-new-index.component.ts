import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IIndexs } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { IndexesService } from '../../service/indexes.service';
@Component({
  selector: 'app-edit-new-index',
  templateUrl: './edit-new-index.component.html',
  styleUrls: ['./edit-new-index.component.scss']
})
export class EditNewIndexComponent implements OnInit {
  index={ indexName: {ar:'',en:''}, indexTypeId: '', indexStatus: ''};
  selectedTypeListId:number=0;
  checked:boolean=true;
  notChecked:boolean=false;
  isShown:boolean=false;
  message:string="";
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  indexListType;
  urlParameter: string='';
  isBtnLoading: boolean=false;
  indexFormGrp: FormGroup;
  constructor(private fb: FormBuilder,private toastr: ToastrService,private route: ActivatedRoute, private headerService: HeaderService,private layoutService:LayoutService, private router: Router, private translate: TranslateService, private indexService: IndexesService) {
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
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
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

    this.indexService.getIndextTypeList().subscribe((res)=>{this.indexListType=res;})

    this.indexService.getIndexByID(Number(this.urlParameter)).subscribe((res)=>{
      
      this.index=res;
 
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
                  indexTypeId:this.indexFormGrp.value.indexType, 
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
    this.toastr.clear();
    this.layoutService.message.next( 'dashboard.Indexes.Old System Lists will be changed Based on New edit');
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.toastr.success( this.translate.instant(this. message));
  }

  showErrorMessage()
  {
    this.toastr.clear();
    this.layoutService.message.next( 'dashboard.Indexes.You should enter Valid Data First');
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.toastr.error( this.translate.instant(this. message));
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
        this.isShown=true;
      }
  
    }
    else{
      if(this.urlParameter)
      {
        this.index.indexStatus="Notactive";
     
      }
      else
      {
        this.isShown=false;
      }
     
    }
  }

  bindOldIndex(index)
  {
        index.indexStatus= index.indexStatus=='Active'||index.indexStatus=='1'?this.checked:this.notChecked;
 
        this.indexFormGrp.patchValue({arabicIndexName:index.indexName.ar, 
          englishIndexName:index.indexName.en,
          indexType:index.indexTypeId,
          indexStatus:index.indexStatus
        });
    
       
  }

 
 
}
