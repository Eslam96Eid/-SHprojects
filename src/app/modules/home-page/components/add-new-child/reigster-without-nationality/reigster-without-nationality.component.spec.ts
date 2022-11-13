import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReigsterWithoutNationalityComponent } from './reigster-without-nationality.component';

describe('ReigsterWithoutNationalityComponent', () => {
  let component: ReigsterWithoutNationalityComponent;
  let fixture: ComponentFixture<ReigsterWithoutNationalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReigsterWithoutNationalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReigsterWithoutNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
