import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestdetailsComponent } from './requestdetails.component';

describe('RequestdetailsComponent', () => {
  let component: RequestdetailsComponent;
  let fixture: ComponentFixture<RequestdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
