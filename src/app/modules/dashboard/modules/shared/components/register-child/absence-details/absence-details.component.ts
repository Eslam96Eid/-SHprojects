import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.scss']
})
export class AbsenceDetailsComponent implements OnInit, AfterViewInit {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Output() onEdit = new EventEmitter()
  @ViewChild('nav') nav: ElementRef

  navListLength

  get permissionEnum(){ return PermissionsEnum }

  step=0
  editStudentinfoMode =false

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];


    // << DATA PLACEHOLDER >> //

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
  studentFormm = this.fb.group({
    id: [] ,
    arabicName: [],
    englishName: [],
    surName: [],
    guardianId: [],
    schoolId: [],
    gradeId: [],
    classRoomId: [] ,
    schoolYearId: [] ,
    genderId: [] ,
    religionId: [] ,
    curriculumId: [] ,
    trackId: [] ,
    nationalityId: [] ,
    expireDate:[], //missing
    nationalId:[], //missing
    birthDate: [],
    daleelId: [] ,
    ministerialId: [] ,
    schoolCode: [] ,
    isSpecialAbilities: [] ,
    isSpecialClass: [] ,
    isChildOfAMartyr : [],
    isPassed : [],
    isGifted: [] ,
    emiratesIdPath: [],
    addressId: [] ,
    behaviorId: [],
    city:[], //missing
    emara:[], //missing
    state:[], //missing
    requiredAmount:[], //missing
    paidAmount:[], //missing
    restAmount:[], //missing
    accountantComment:[], //missing
  })

  student=
  {
    name:'محمد على',
    age: 15,
    regestered: true,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school:'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation:'ابن الاخ',
    src:'assets/images/avatar.png'
  }

    // << FORMS >> //
    medicalFileForm= this.fb.group({
      id:[],
      chronicDiseases: [[{name:'أمراض القلب'},{name:'السكرى'}]],
      allergicDiseases: [['سيلان الأنف التحسسي ']],
      disabilities: [],
      isTheSonOfDetermination: [],
      fats: [],
      iq:[],
      intelligencePercentage:[],
      bloc:[],
      increase: [],
      decrease: [],
      dietFollowed: [],
      isAthletic: [],
      weight: [],
      height:[],
      otherNotes: []
    })
  constructor(
    private fb:FormBuilder,
    private renderer: Renderer2,) { }


  ngAfterViewInit(): void {
    let navItemsList =this.nav.nativeElement.children
    navItemsList[0].classList.add('active')
    this.navListLength = navItemsList.length

  }

  ngOnInit(): void {
  }

  onEditmode(){
    this.onEdit.emit(this.student.regestered)
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
