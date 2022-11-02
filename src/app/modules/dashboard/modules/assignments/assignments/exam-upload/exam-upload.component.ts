import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AssignmentServiceService } from 'src/app/modules/dashboard/modules/assignments/service/assignment-service.service';
import { MediaService } from 'src/app/shared/services/media/media.service';


export interface CustomFile{
  url:string,
  name: string
}

@Component({
  selector: 'app-exam-upload',
  templateUrl: './exam-upload.component.html',
  styleUrls: ['./exam-upload.component.scss']
})
export class ExamUploadComponent implements OnInit {

  faXmark = faXmark
  // application/pdf
  @Input() title = ''
  @Input() label = ' انقر لإرفاق ملف'
  @Input() accept = 'image/*'
  @Input() url=''
  @Input() files: CustomFile[] =[]
  @Input() multiple = false
  @Input('view') view: 'list' | 'box' | 'rows' | 'full'
  @Output() onFileUpload= new EventEmitter<any>();
  @Output() onFileDelete= new EventEmitter<any>();
  @Output() onImageOrPdfDeleted = new EventEmitter<void>();
  @Output() onAudioDeleted = new EventEmitter<void>();
  audioFile: CustomFile = {} as CustomFile;
  pdfFile: CustomFile = {} as CustomFile;

  // @Output() onFileDropped = new EventEmitter<any>();
  // @HostBinding('style.background-color') private background = '#f5fcff'
  // @HostBinding('style.opacity') private opacity = '1'

  // //Dragover listener
  // @HostListener('dragover', ['$event']) onDragOver(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.background = '#9ecbec';
  //   this.opacity = '0.8'
  // }

  // // //Dragleave listener
  // @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.background = '#f5fcff'
  //   this.opacity = '1'
  // }

  // // //Drop listener
  // @HostListener('drop', ['$event']) public ondrop(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.background = '#f5fcff'
  //   this.opacity = '1'
  //   let files = evt.dataTransfer.files;
  //   if (files.length > 0) {
  //     this.onFileDropped.emit(files)
  //   }
  // }

  // files:Partial<File>[] =[
  //   // {name:' ملف المرفقات.pdf'},
  //   // {name:' ملف المرفقات.pdf'},
  //   // {name:' ملف المرفقات.pdf'}
  // ]


  constructor(private media: MediaService, private toaster:ToastrService,
    private assignmentService: AssignmentServiceService) { }

  ngOnInit(): void {
  }




  uploadFile(event) {
    let files: File[]=event.target.files
    let file: File=event.target.files[0]

    // incase their is More thane one file uploaded
    if(files.length && files.length > 1){
      files.forEach(file =>{
        if(file.type.includes('image')){
          this.onImageUpload(file)

        } else if(file.type.includes('application')){
          this.onOtherFileUpload(file)
        }
      })

    }else{
  // incase one file uploaded

      console.log('file', file.type);
      //  || file.type.includes('image')
      if(file.type.includes('application/pdf')){
        this.onImageUpload(file)

      } else if(file.type.includes('audio/')){
        this.onOtherFileUpload(file)
      }
    }



	}

  async onImageUpload(file:File){
    // let dataURL = await this.imageStream(event)
    // this.url = dataURL

    // const FORM_DATA = new FormData()
    // FORM_DATA.append('file', file)
    // this.media.uploadMedia(FORM_DATA, 'image').pipe(take(1)).subscribe(res =>{
    //   this.onFileUpload.emit({url: res.url, name: file.name})
    // })
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.pdfFile.name = file.name;
    this.assignmentService.onFileUpload(formData).subscribe(res => {
      if (res && res.url) {
        this.onFileUpload.emit({url: res.url, name: this.pdfFile.name});
        this.pdfFile.url = res.url;
        // this.url = res.url;
      }
    });

  }

  removeImage() {
		this.url = null
    this.onImageOrPdfDeleted.emit();
	}



  onOtherFileUpload(file:File){
    const formData = new FormData();
    this.audioFile.name = file.name;
    formData.append('file', file, file.name);
    this.assignmentService.onFileUpload(formData).subscribe(res => {
      if (res && res.url) {
        this.onFileUpload.emit({url: res.url, name: this.audioFile.name});
        this.audioFile.url = res.url;
      }
    });
    // console.log(file);

    // const FORM_DATA = new FormData()
    // FORM_DATA.append('file', file)
    // this.media.uploadMedia(FORM_DATA, 'file').pipe(take(1)).subscribe(res =>{

    //   this.files.push({url: res.url, name: file.name});
    //   this.onFileUpload.emit(this.files)
    //   this.toaster.success('تم رفع الملف بنجاج')
    // },err =>{
    //   this.toaster.error('حدث خطأ يرجاء المحاوله مره اخرى')
    // })
  }

  removeFile(index){
    this.files.splice(index, 1)
    this.onFileDelete.emit()
  }


  removeAudioFile(): void {
    this.audioFile = null;
    this.onAudioDeleted.emit();
  }

  removePdfFile(): void {
    this.pdfFile = null;
    this.onImageOrPdfDeleted.emit();
  }


  imageStream(e, maxSize = 10) {
		let image: any;
		let file = e.target.files[0];

		  if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			image = new Promise(resolve => {
				reader.onload = (event: any) => {
          // let url= this.getBase64StringFromDataURL(event.target.result)

					resolve(event.target.result);
				}
				reader.readAsDataURL(e.target.files[0]);
			}
			)
		}
		return Promise.resolve(image);
	}

  getBase64StringFromDataURL(dataURL) {
    return dataURL.replace('data:', '').replace(/^.+,/, '');
  }


}

