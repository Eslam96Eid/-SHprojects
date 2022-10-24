import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListOfUsersComponent } from './view-list-of-users.component';

describe('ViewListOfUsersComponent', () => {
  let component: ViewListOfUsersComponent;
  let fixture: ComponentFixture<ViewListOfUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListOfUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListOfUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
