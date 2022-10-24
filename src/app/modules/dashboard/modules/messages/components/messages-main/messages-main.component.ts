import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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

  
  iteration:number=0;
  checked: boolean;
  checked1: boolean = true;
  display: boolean = false;
  currentNotificationNumber:number=0;
  allNotificationNumber:number=0;
  activeLoadBtn:boolean=false;
  messagesList:INotification[]=[];
  showSpinner:boolean=false;
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.Messages.messages') }
			
		],
		mainTitle:{ main:this.translate.instant('dashboard.Messages.messages')},
    showNoOfMessages: true
	}

  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private messageService: MessageService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.messageService.messagesList.subscribe((res)=>{this.messagesList=res.slice(this.iteration,this.iteration+=2);this.currentNotificationNumber=this.messagesList.length;this.showSpinner=true; });
   
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.allNotificationNumber=this.messageService.messagesAPIList.length;
    this.messageService.messageNumber.next(this.messageService.messagesAPIList.length);
    console.log(this.messageService.messagesAPIList.length);
    
  }
  showDialog() {
    this.display = true;
}
  getNotReadable()
  {
   

  }
  getReadable()
  {

  }
  onScroll()
  {

    if(this.messageService.messagesAPIList.length==this.messagesList.length)
    { this.showSpinner=false;}
    else
    { this.showSpinner=true;}  


    this.loadMore();
    
  }
 
  loadMore()
  {
    
    this.messageService.messagesList.subscribe((res)=>{this.messagesList.push(...res.slice(this.iteration,this.iteration+=2));this.currentNotificationNumber=this.messagesList.length;});
    console.log("loaded more");
    
  }

  showDetails(MessageId: number) {
    this.router.navigate(['/dashboard/messages/message-detail/', MessageId]);
  }


  
  @Output() onFileDropped = new EventEmitter<any>();
	
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }
	
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
	
}
