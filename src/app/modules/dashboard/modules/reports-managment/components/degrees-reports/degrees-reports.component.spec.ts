import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreesReportsComponent } from './degrees-reports.component';

describe('DegreesReportsComponent', () => {
  let component: DegreesReportsComponent;
  let fixture: ComponentFixture<DegreesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreesReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
