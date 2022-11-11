import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeaRegisterChildComponent } from './spea-register-child.component';

describe('SpeaRegisterChildComponent', () => {
  let component: SpeaRegisterChildComponent;
  let fixture: ComponentFixture<SpeaRegisterChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeaRegisterChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeaRegisterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
