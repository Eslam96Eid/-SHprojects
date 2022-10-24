import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsChildComponent } from './attachments-child.component';

describe('AttachmentsChildComponent', () => {
  let component: AttachmentsChildComponent;
  let fixture: ComponentFixture<AttachmentsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
