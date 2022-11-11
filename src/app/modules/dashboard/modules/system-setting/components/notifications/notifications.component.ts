import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  faChevronLeft=faChevronLeft

  selectedValue='val1'
  
  filtration={...Filtration}
  paginationState= {...paginationInitialState}
  
  notificationModelOpend = false
  
  notifications={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  schoolClasses:any[] =[
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
  constructor() { }

  ngOnInit(): void {
  }

  

  getPeriods(){

  }

}
