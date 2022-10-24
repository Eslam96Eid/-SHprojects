import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MediaService } from '../../services/media/media.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  faXmark = faXmark

  @Input('title') title = ''
  @Input('label') label = ''
  @Input() url=''
  @Input('view') view: 'list' | 'box' | 'rows' = 'box'
  @Output() onFileUpload= new EventEmitter<any>();

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

  files:Partial<File>[] =[{name:' ملف المرفقات.pdf'},{name:' ملف المرفقات.pdf'},{name:' ملف المرفقات.pdf'}]


  constructor(private media: MediaService) { }

  ngOnInit(): void {
  }



  
  uploadFile(event) {
    let file: File=event.target.files[0]

    if(file.type.includes('image')){
      this.onImageUpload(file)

    } else if(file.type.includes('image')){
      this.onOtherFileUpload(file)
    }


	}

  async onImageUpload(file:File){
    let dataURL = await this.imageStream(event)
    this.url = dataURL
    this.onFileUpload.emit({dataURL, name: file.name})
    
    const FORM_DATA = new FormData()
    FORM_DATA.append('file', file)
    this.media.uploadMedia(FORM_DATA, 'image').subscribe(res =>{
      console.log(res);
      
    })

  }

  removeImage() {
		this.url = null
	}



  onOtherFileUpload(file:File){
    this.files.push(file);
    this.onFileUpload.emit(file)
  }

  removeFile(index){
    this.files.splice(index, 1)
  }



  
  imageStream(e, maxSize = 10) {
		let image: any;
		let file = e.target.files[0];
		console.log(file);


		  if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			image = new Promise(resolve => {
				reader.onload = (event: any) => {
          let url= this.getBase64StringFromDataURL(event.target.result)
          
					resolve(url);
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
