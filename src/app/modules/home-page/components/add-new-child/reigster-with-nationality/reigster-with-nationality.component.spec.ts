import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReigsterWithNationalityComponent } from './reigster-with-nationality.component';

describe('ReigsterWithNationalityComponent', () => {
  let component: ReigsterWithNationalityComponent;
  let fixture: ComponentFixture<ReigsterWithNationalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReigsterWithNationalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReigsterWithNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
