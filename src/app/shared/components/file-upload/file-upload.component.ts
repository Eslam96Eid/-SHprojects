import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import {faFileCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, filter, finalize, forkJoin, map, Observable, observable, of, take, tap } from 'rxjs';
import { MediaService } from '../../services/media/media.service';

export interface CustomFile{
  url:string,
  name: string
}
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  faXmark = faXmark

  @Input() title = ''
  @Input() label = ' انقر لإرفاق ملف'
  @Input() accept = 'image/*'
  @Input() imgUrl=''
  @Input() multiple = false
  @Input() maxFilesToUpload = 3
  @Input() maxFileSize = 4
  @Input() files: CustomFile[] =[]  // files to view
  @Input('view') view: 'list' | 'box' | 'rows' | 'full'  // file uploader theme variants
  @Output() onFileUpload= new EventEmitter<any>();
  @Output() onFileDelete= new EventEmitter<any>();

  inProgress=false
  uploaded =false
  hideCheck=true
  faFileCircleExclamation =faFileCircleExclamation


  constructor(private media: MediaService, private toaster:ToastrService) { }

  ngOnInit(): void {}


 uploadedFilesName:string[]=[]
  
  validateSelectedFiles(event) {
    let files: File[]=[...event.target.files]
    
    // Validation Condition 1 
    if((files.length +this.files.length) > this.maxFilesToUpload) {
      this.toaster.error(`يجب ان لا يذيد عدد الملفات عن ${this.maxFilesToUpload}`)
      return;
    }

    let streams:Observable<any>[]=[]

    files.forEach((file, index)=>{

      // Validation Condition 2
      if(this.fileSizeMB(file.size) > this.maxFileSize){
        this.toaster.error(`يجب ان لا يذيد حجم الملف عن ${this.maxFileSize}MB`, file.name)

      }else{
        this.uploadedFilesName.push(file.name)

        const FORM_DATA = new FormData()
        FORM_DATA.append('file', file)

        let httpCall = this.media.uploadMedia(FORM_DATA)
        .pipe(
          tap(()=>console.log(index)),
          catchError(err=> {
            this.uploadedFilesName.splice(index,1)
            this.toaster.error(`عذرا حدث خطأ فى رفع الملف ${file.name} يرجى المحاوله مره اخرى`)
            return of(null)
        }))

        streams.push(httpCall)
      }
      
    })

    if(streams.length) this.uploadFiles(streams);

	}



  uploadFiles(httpArr){
    
    this.inProgress=true

    forkJoin(httpArr)
    .pipe(
      take(1), 
      filter((res:any) => res.url),
      finalize(()=> setTimeout(()=> this.hideCheck=true, 1500) ),
    )
    .subscribe((res:any[]) =>{
      console.log(res);
  
      
      // special Case for for viewing school logo
      this.imgUrl =res[0]?.url

      let uploadedFiles = res.map((url, index)=> ({url, name: this.uploadedFilesName[index]}));

      if(uploadedFiles.length){
        this.files = [...this.files, ...uploadedFiles ]
        this.onFileUpload.emit(this.files)
        this.toaster.success(`تم رفع الملف ${this.uploadedFilesName.join(' | ')} بنجاح`)
        console.log(this.files);
      }
      
        this.inProgress=false;
        this.uploaded=true
        this.hideCheck=false

        this.uploadedFilesName=[]

    },err =>{

      this.inProgress=false;
      this.uploaded=false
      this.hideCheck=false
      this.toaster.error('حدث خطأ يرجاء المحاوله مره اخرى')
    })
  }

  

  removeFile(index){
    this.files.splice(index, 1)
    this.onFileDelete.emit(this.files)
  }


  fileSizeMB = (size: string | number) => {
    return +size / 1024 / 1024
  }

}
