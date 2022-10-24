import { Component, Input, OnInit } from '@angular/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {


  @Input() schools=[]

  constructor() { }

 first
 rows 
  ngOnInit(): void {
  }


  paginationChanged(event: paginationState) {
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}
}
