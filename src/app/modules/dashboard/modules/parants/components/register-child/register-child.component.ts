import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faHome, faFilter, faSearch, faAngleLeft, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { IHeader } from 'src/app/core/Models/header-dashboard';
@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit {

  faHome = faHome
  faFilter = faFilter
  faSearch = faSearch
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight


  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه المدارس ' ,routerLink: '/dashboard/schools-and-students/schools'},
    ],
  }

  first = 0
  rows = 8
  step=3

  schoolClasses: any[] = [

    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },

  ]
  files: any = [];
  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'

  // //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  // //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }

  // //Drop listener
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
  constructor(private translate: TranslateService,
    private headerService: HeaderService) { }
  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }
	onFileUpload($event){

	}

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }


  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

  }
}


