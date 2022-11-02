import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationConditionsComponent } from './registration-conditions.component';

describe('RegistrationConditionsComponent', () => {
  let component: RegistrationConditionsComponent;
  let fixture: ComponentFixture<RegistrationConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
