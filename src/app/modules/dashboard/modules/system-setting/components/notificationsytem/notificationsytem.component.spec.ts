import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsytemComponent } from './notificationsytem.component';

describe('NotificationsytemComponent', () => {
  let component: NotificationsytemComponent;
  let fixture: ComponentFixture<NotificationsytemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsytemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsytemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
