import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GracePeriodComponent } from './grace-period.component';

describe('GracePeriodComponent', () => {
  let component: GracePeriodComponent;
  let fixture: ComponentFixture<GracePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GracePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GracePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
