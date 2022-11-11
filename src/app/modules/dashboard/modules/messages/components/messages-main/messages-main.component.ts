import { query } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { tap, forkJoin } from 'rxjs';
import { IHeader, INotification } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-messages-main',
  templateUrl: './messages-main.component.html',
  styleUrls: ['./messages-main.component.scss']
})
export class MessagesMainComponent implements OnInit {

  cities=[]

  text: string;
  results: string[];
  @ViewChild('readBtn', { read: ElementRef, static:false }) readBtn: ElementRef;
  @ViewChild('notReadBtn', { read: ElementRef, static:false }) notReadBtn: ElementRef;

  searchModel2 = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 3,
    "SortColumn": null,
    "SortDirection": null,
    "curricuulumId": null,
    "StateId": null,
    "MessageStatus":null,
    "DateFrom": null,
    "DateTo": null
  }
  useId=Number(localStorage.getItem('$AJ$userId'))

  scope=JSON.parse(localStorage.getItem('$AJ$user')).scope

  display: boolean = false;
  activeLoadBtn:boolean=false;
  showSpinner:boolean=false;
  messagesList = []
  messageTotal!:number;
  loading:boolean = false;
  iteration:number=0;
  skeletonLoading:boolean = false
  checkLanguage:boolean = false
  filterationForm: FormGroup
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.Messages.messages'), routerLink:'/dashboard/messages/messages' }
			
		],
		mainTitle:{ main:this.translate.instant('dashboard.Messages.messages'),sub:this.messageTotal},
	}

  constructor(private headerService: HeaderService,private formbuilder:FormBuilder, private toastr:ToastrService,private router: Router, private translate: TranslateService, private messageService: MessageService,private spinner:NgxSpinnerService) {
   }

  ngOnInit(): void {

    this.getMessages(this.searchModel2)
    if(localStorage.getItem('preferredLanguage')=='ar'){
      this.checkLanguage = true
    }else{
      this.checkLanguage = false
    }    

    
    this.filterationForm = this.formbuilder.group({
      DateFrom : '',
      DateTo : ''
    });    
  }

  getMessages(searchModel2){
    this.skeletonLoading = true
    this.showSpinner = false
    this.loading=true
    if(this.scope == "Guardian"){
    this.messageService.getMessagesGuardian(this.useId,searchModel2).subscribe(res=>{
      this.skeletonLoading= false
      this.loading=false
      this.messagesList = res.data
      this.messageTotal = res.total
      this.componentHeaderData.mainTitle.sub = `(${res.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);  
      this.showSpinner = true  
    })
  }

  if(this.scope == "Employee"){
    this.messageService.getMessagesSchoolEmp(this.useId,searchModel2).subscribe(res=>{
      this.skeletonLoading= false
      this.loading=false
      this.messagesList = res.data
      this.messageTotal = res.total
      this.componentHeaderData.mainTitle.sub = `(${res.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);  
      this.showSpinner = true  
    })
  }

  if(this.scope == "SPEA"){
    this.messageService.getMessagesSpea(this.useId,searchModel2).subscribe(res=>{
      this.skeletonLoading= false
      this.loading=false
      this.messagesList = res.data
      this.messageTotal = res.total
      this.componentHeaderData.mainTitle.sub = `(${res.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);  
      this.showSpinner = true  
    })
  }

  }

  filterDate(event){    
    if(this.filterationForm.value.DateFrom && this.filterationForm.value.DateTo){
      this.searchModel2.DateFrom= `${new Date(event).toISOString()}`
      this.searchModel2.DateTo= `${new Date(event).toISOString()}`
      this.getMessages(this.searchModel2)
    }
  }


 

  showDialog() {
    this.display = true;
}
  getNotReadable()
  {
    this.readBtn.nativeElement.classList.remove('activeBtn')
    this.notReadBtn.nativeElement.classList.add('activeBtn')
    this.searchModel2.keyword = null
    this.searchModel2.page = 1
    this.searchModel2.pageSize = 3
    this.searchModel2.MessageStatus = 0
    this.getMessages(this.searchModel2)

  }
  getReadable()
  {
    this.readBtn.nativeElement.classList.add('activeBtn')
    this.notReadBtn.nativeElement.classList.remove('activeBtn')
    this.searchModel2.keyword = null
    this.searchModel2.page = 1
    this.searchModel2.pageSize = 3
    this.searchModel2.MessageStatus = 1
    this.getMessages(this.searchModel2)
  }
  onScroll()
  {

    if(this.messagesList.length==0){
      this.skeletonLoading = false
    }else{
        this.loadMore();
    }
    
  }
 
  loadMore()
  {
    
    this.searchModel2.page = 1
    this.searchModel2.pageSize += 3
    this.getMessages(this.searchModel2)
    
  }
  onSearch(e) {
    
    this.searchModel2.keyword = e.target.value
    this.searchModel2.page = 1
    this.getMessages(this.searchModel2)
    if(this.messagesList.length == 0){
      this.skeletonLoading = false
    }
}
  showDetails(MessageId: number) {
    this.router.navigate(['/dashboard/messages/message-detail/', MessageId]);
  }

        
}
