import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferGroupComponent } from './transfer-group.component';

describe('TransferGroupComponent', () => {
  let component: TransferGroupComponent;
  let fixture: ComponentFixture<TransferGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
