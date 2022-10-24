import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  @Input('editList') editList=[]

  faChevronCircleLeft = faChevronLeft

  
  first = 0
  rows = 4

  openEditListModel=false
  
  constructor(
    private schoolsService:SchoolsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  paginationChanged(event: paginationState) {
		console.log(event);
		this.first = event.first
		this.rows = event.rows
	}
}
