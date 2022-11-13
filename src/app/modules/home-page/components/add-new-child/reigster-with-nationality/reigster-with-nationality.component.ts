import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';

@Component({
  selector: 'app-reigster-with-nationality',
  templateUrl: './reigster-with-nationality.component.html',
  styleUrls: ['./reigster-with-nationality.component.scss']
})
export class ReigsterWithNationalityComponent implements OnInit {

  unregisterChild : IunregisterChild;

  step=1

  student =
  {
    name: 'محمد على',
    age: 15,
    regestered: false,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school: 'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation: 'ابن الاخ',
    src: 'assets/images/avatar.png'
  }
  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];

  constructor(private parentService : ParentService,
     private _router: ActivatedRoute,
     private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getUnregisterChild();
  }


  registernewchildform=this.fb.group({
    id:[],
    chronicDiseases: [[{name:'أمراض القلب'},{name:'السكرى'}]],
  })

  getUnregisterChild(){

    let id = Number(this._router.snapshot.paramMap.get('id'));
    this.parentService.getUnregisterChildern(id).subscribe(response=>{
      this.unregisterChild = response;
      console.log(this.unregisterChild);
    })
  }
}
