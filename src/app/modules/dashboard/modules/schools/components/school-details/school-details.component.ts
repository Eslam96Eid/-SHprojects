import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';


import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { SchoolsService } from '../../services/schools/schools.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { School } from 'src/app/core/models/schools/school.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';




// declare var google: any;

@Component({
	selector: 'app-school-details',
	templateUrl: './school-details.component.html',
	styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {
	@ViewChild('nav') nav: ElementRef


	
	// << Route Data >> //
	schoolId = this.route.snapshot.paramMap.get('schoolId')
	school:School
	
	
	// << Data Placeholder>> //
	schoolClasses: any[] = [
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
		{
			"id": "1003",
			"code": "244wgerg2",
			"name": "Blue T-Shirt",
			"description": "Product Description",
			"image": "blue-t-shirt.jpg",
			"price": 29,
			"category": "Clothing",
			"quantity": 25,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1004",
			"code": "h456wer53",
			"name": "Bracelet",
			"description": "Product Description",
			"image": "bracelet.jpg",
			"price": 15,
			"category": "Accessories",
			"quantity": 73,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1005",
			"code": "av2231fwg",
			"name": "Brown Purse",
			"description": "Product Description",
			"image": "brown-purse.jpg",
			"price": 120,
			"category": "Accessories",
			"quantity": 0,
			"inventoryStatus": "OUTOFSTOCK",
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
		},
		{
			"id": "1006",
			"code": "bib36pfvm",
			"name": "Chakra Bracelet",
			"description": "Product Description",
			"image": "chakra-bracelet.jpg",
			"price": 32,
			"category": "Accessories",
			"quantity": 5,
			"inventoryStatus": "LOWSTOCK",
			"rating": 3,
			"date":' 12:00pm - 2022/07/04 '
		},
		{
			"id": "1007",
			"code": "mbvjkgip5",
			"name": "Galaxy Earrings",
			"description": "Product Description",
			"image": "galaxy-earrings.jpg",
			"price": 34,
			"category": "Accessories",
			"quantity": 23,
			"inventoryStatus": "INSTOCK",
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
		}
	]

	componentHeaderData: IHeader = {
		breadCrump: [
			{ label: 'قائمه المدارس ' , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
			{ label: 'الاطلاع على معلومات المدرسه', routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`},
		],
		mainTitle: { main: 'مدرسه الشارقه الابتدائيه' }
	}

	map: any

	// << Conditions >> //
	step
	navListLength




	constructor(
		public translate: TranslateService,
		public sharedService: SharedService,
		private translatService: TranslationService,
		private route: ActivatedRoute,
		private headerService: HeaderService,
		private schoolsService:SchoolsService) { }

	ngOnInit(): void {

		this.headerService.changeHeaderdata(this.componentHeaderData)
		// this.translatService.init(environment.defaultLang)
		// this.translate.use('en');
		this.getSchool(this.schoolId)

	}

	ngAfterViewInit() {
		this.setActiveTab(0)
	}
	
	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children
		
		if(nodeIndex == 0){
			navItemsList[nodeIndex].classList.add('active')
			this.navListLength = navItemsList.length
			if(navItemsList[0].dataset.step) this.step = navItemsList[0].dataset.step
			else this.step = 1
		}
	}

	getSchool(id){
		this.schoolsService.getSchool(id).subscribe(res =>{
			this.school = res
			this.loadMap();
		})
	}




	// private getCurrentPosition(): any {
	// 	return new Observable((observer: Subscriber<any>) => {
	// 		if (navigator.geolocation) {
	// 			navigator.geolocation.getCurrentPosition((position: any) => {
	// 				observer.next({
	// 					latitude: position.coords.latitude,
	// 					longitude: position.coords.longitude,
	// 				});
	// 				observer.complete();
	// 			});
	// 		} else {
	// 			observer.error();
	// 		}
	// 	});
	// }

	accessToken = 'pk.eyJ1IjoiYnJhc2thbSIsImEiOiJja3NqcXBzbWoyZ3ZvMm5ybzA4N2dzaDR6In0.RUAYJFnNgOnn80wXkrV9ZA';

	private loadMap(): void {
		// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		//   maxZoom: 18,
		//   id: 'mapbox/streets-v11',
		//   tileSize: 512,
		//   zoomOffset: -1,
		// 	minZoom: 3,
		//   accessToken: this.accessToken,
		// }).addTo(this.map);

		// [25.081622124248337, 55.216447958765755]
		this.map = L.map('map').setView([this.school?.address?.latitude, this.school?.address?.longitutde], 14);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(this.map);


		const icon = L.icon({
			iconUrl: 'assets/images/shared/map-marker.svg',
			shadowUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
			popupAnchor: [13, 0],
		});

		const marker = L.marker([this.school?.address.latitude, this.school?.address.longitutde], { icon }).bindPopup(this.school?.name.ar);
		marker.addTo(this.map);
	}

	onLogoFileUpload(event){
		const file={
			title:event.name,
			data: event.dataURL
		}
		// this.schoolsService.updateSchoolLogo(this.schoolId,file).subscribe()
	}
	
	onDiplomaFileUpload(event){
		const file={
			title:event.name,
			data: event.dataURL
		}
		// this.schoolsService.updateSchoolDiplomaLogo(this.schoolId,file).subscribe()
	}

	handleMapClick(event) {
		//event: MouseEvent of Google Maps api
		console.log(event);

	}

	handleOverlayClick(event) {
		//event.originalEvent: MouseEvent of Google Maps api
		//event.overlay: Clicked overlay
		//event.map: Map instance
		console.log(event);
	}

	hideNavControl=true;

	scrollLeft(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft - 175, behavior:'smooth'})
		this.hideNavControl = false;
	}
	
	scrollRight(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft + 175, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;
		
	}

}
