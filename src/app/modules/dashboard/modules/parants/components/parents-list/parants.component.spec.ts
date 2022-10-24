import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParantsComponent } from './parants.component';

describe('ParantsComponent', () => {
  let component: ParantsComponent;
  let fixture: ComponentFixture<ParantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
