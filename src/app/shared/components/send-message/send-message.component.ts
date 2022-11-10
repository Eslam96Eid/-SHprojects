import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { MessageService } from 'src/app/modules/dashboard/modules/messages/service/message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  scope=JSON.parse(localStorage.getItem('$AJ$user')).scope
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 100,
    "SortColumn": null,
    "SortDirection": null,
    "curricuulumId": null,
    "StateId": null
  }

  autoCompleteForParent = []
  imagesResult =[]
  messagesTypes = []
  curricuulum = []
  address = []
  schools = []
  uploadedFiles: any[] = [];
  attachmentList = [];
  files: any = [];
  attachmentsName=[]
  speaEmpForm: FormGroup;
  parentForm: FormGroup;
  schoolEmpForm: FormGroup
  isShown:boolean=false;
  isShown1:boolean=false;
  isShown2:boolean=false;

  constructor(private formbuilder:FormBuilder, private toastr:ToastrService, private translate: TranslateService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCurr()
    this.getMessagesTypes()
    this.getAddress()
    this.speaEmpForm = this.formbuilder.group({
      curricuulumId: ['', [Validators.required]],
      StateId: ['', [Validators.required]],
      schoolId: ['', [Validators.required]],
      title: ['', [Validators.required,Validators.maxLength(32)]],
      switch1: [false, [Validators.required]],
      switch2: [false, [Validators.required]],
      switch3: [false, [Validators.required]],
      messageType: ['', [Validators.required]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
    });

    this.parentForm = this.formbuilder.group({
      title: ['', [Validators.required,Validators.maxLength(32)]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
      messageType: ['', [Validators.required]],
    });


    this.schoolEmpForm = this.formbuilder.group({
      guardian: ['', [Validators.required]],
      title: ['', [Validators.required,Validators.maxLength(32)]],
      switch2: [false, [Validators.required]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
      messageType: ['', [Validators.required]],
    });  
  }


  
  getSchools(event){
    console.log(event);
    if(this.speaEmpForm.value.curricuulumId && this.speaEmpForm.value.StateId){
      this.searchModel.curricuulumId=event.value
      this.searchModel.StateId=event.value
      this.searchModel.page = null
      this.searchModel.pageSize = null
      this.messageService.getApiSchool(this.searchModel).subscribe(res=>{
      this.schools = res.data
    })
    }
  }

  getCurr(){
    this.messageService.getcurr().subscribe(res=>{
      this.curricuulum = res.data
      console.log(this.curricuulum);
      
    })
  }

  getAddress(){
    this.messageService.getadd().subscribe(res=>{
      this.address = res.data
    })
  }



  getMessagesTypes(){
    this.messageService.getmessagesTypes().subscribe(res=>{
      console.log(res);
      
      this.messagesTypes = res
    })
  }
  

  search(event) {
    this.searchModel.keyword = event.query
    this.searchModel.page = null
    this.searchModel.pageSize = null
    this.messageService.getGuardian(this.searchModel).subscribe(res=>{
         this.autoCompleteForParent=  res.data
   })
    
 }


  onUpload(event) {

    for(let file of event.files) {
  
        this.uploadedFiles.push(file);
  
    }
  
    }
    onFileUpload(data: {files: Array<File>}): void {
  
      const requests = [];
  
      data.files.forEach(file => {
  
        const formData = new FormData();
  
        formData.append('file', file, file.name);
  
        requests.push(this.messageService.onFileUpload(formData));
  
      });
  
      forkJoin(requests).subscribe((res: Array<{url: string}>) => {
        console.log(res);
        
        if (res && res.length > 0) {
  
          res.forEach(item => {
            console.log(item);
            
            const extension = item.url.split('.').pop();
            console.log(extension);
            
  
              console.log(item.url);
              
                this.imagesResult.push(item.url)
              console.log(this.imagesResult);
          });
  
        }
  
      });
  
    }
    isToggleLabel(e)
    {
      if(e.checked)
      {
          this.isShown=true;
      }
      else{
          this.isShown=false;
      }
    }
    isToggleLabel1(e)
    {
      if(e.checked)
      {
          this.isShown1=true;
  
      }
      else{
          this.isShown1=false;
      }
    }
    isToggleLabel2(e)
    {
      if(e.checked)
      {
          this.isShown2=true;
  
      }
      else{
          this.isShown2=false;
      }
    }
      sendMessage(){
        if(this.scope == "SPEA"){
        const form = {
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
          "messageType": this.speaEmpForm.value.messageType,
          "schoolId": this.speaEmpForm.value.schoolId.map(res=>res.id), 
          "title": this.speaEmpForm.value.title,
          "confirmationRecive": this.speaEmpForm.value.switch1,
          "replyPossibility": this.speaEmpForm.value.switch2,
          "showSenderName": this.speaEmpForm.value.switch3,
          "messegeText": this.speaEmpForm.value.description,
          'attachments': this.imagesResult || null
        }    
        this.messageService.sendDataFromSpeaToEmp(form).subscribe(res=>{
          this.toastr.success('Message Sent Successfully')
          this.isShown=false;
          this.isShown1=false;
          this.isShown2=false;
          this.speaEmpForm.reset();
        },err=>{
          this.toastr.error(err)
        })
      }
  
      if(this.scope == "Guardian"){
        const form ={
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
          "title": this.parentForm.value.title,
          "messegeText": this.parentForm.value.description,
          "messageType": this.parentForm.value.messageType,
          "schoolId": Number(localStorage.getItem('schoolId')),
          'attachment': this.imagesResult || null
        }
        console.log(form);
        this.messageService.sendDataFromGuardianToSchool(form).subscribe(res=>{
          this.toastr.success('Message Sent Successfully')
          this.isShown=false;
          this.isShown1=false;
          this.isShown2=false;
          this.parentForm.reset();
        },err=>{
          this.toastr.error(err)
        })
      }
  
        if(this.scope == "Employee"){
        const form ={
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
          "guardianIds": this.schoolEmpForm.value.guardian.map(res=>res.id),
          "title": this.schoolEmpForm.value.title,
          "replyPossibility": this.schoolEmpForm.value.switch2,
          "messegeText": this.schoolEmpForm.value.description,
          "messageType": this.schoolEmpForm.value.messageType,
          'attachment': this.imagesResult || null
        }
        this.messageService.sendDataFromEmpToGuardian(form).subscribe(res=>{
          this.toastr.success('Message Sent Successfully')
          this.isShown=false;
          this.isShown1=false;
          this.isShown2=false;
          this.schoolEmpForm.reset();
        },err=>{
          this.toastr.error(err)
        })
        }
  
  
    }
}
