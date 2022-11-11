import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GracePeriodsListComponent } from './grace-periods-list.component';

describe('GracePeriodsListComponent', () => {
  let component: GracePeriodsListComponent;
  let fixture: ComponentFixture<GracePeriodsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GracePeriodsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GracePeriodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
