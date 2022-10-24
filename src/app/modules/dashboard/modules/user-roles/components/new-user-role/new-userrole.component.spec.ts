import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserRoleComponent } from './new-userrole.component';

describe('NewUserRoleComponent', () => {
  let component: NewUserRoleComponent;
  let fixture: ComponentFixture<NewUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
