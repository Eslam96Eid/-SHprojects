import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraceSessionComponent } from './grace-session.component';

describe('GraceSessionComponent', () => {
  let component: GraceSessionComponent;
  let fixture: ComponentFixture<GraceSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraceSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraceSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
