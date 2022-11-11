import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-informative-block',
  templateUrl: './informative-block.component.html',
  styleUrls: ['./informative-block.component.scss']
})
export class InformativeBlockComponent implements OnInit {

  @Input() title:string = this.translate.instant('emptyList.noData');
  @Input() subTitle:string;
  @Input() src:string ='assets/images/empty-list/empty-list.svg';
  @Input('size') small:string;
  
  constructor(private translate:TranslateService) { }

  ngOnInit(): void {
  }

}
