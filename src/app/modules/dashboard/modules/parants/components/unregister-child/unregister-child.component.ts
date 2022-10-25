import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IunregisterChild } from '../../models/IunregisterChild';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-unregister-child',
  templateUrl: './unregister-child.component.html',
  styleUrls: ['./unregister-child.component.scss']
})
export class UnregisterChildComponent implements OnInit {
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


  
  constructor(private parentService : ParentService,
     private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUnregisterChild();
  }
  getUnregisterChild(){
    debugger;
    let id = Number(this._router.snapshot.paramMap.get('id'));
    this.parentService.getUnregisterChildern(id).subscribe(response=>{
      this.unregisterChild = response;
      console.log(this.unregisterChild);
    })
  }
}
