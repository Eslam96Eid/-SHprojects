import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPanalComponent } from './dashboard-panal.component';

describe('DashboardPanalComponent', () => {
  let component: DashboardPanalComponent;
  let fixture: ComponentFixture<DashboardPanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPanalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
