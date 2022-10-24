import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesListComponent } from './userroles-list.component';

describe('ViewUserRolesComponent', () => {
  let component: UserRolesListComponent;
  let fixture: ComponentFixture<UserRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRolesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
