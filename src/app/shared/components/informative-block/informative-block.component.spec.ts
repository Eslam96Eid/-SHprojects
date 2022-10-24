import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeBlockComponent } from './informative-block.component';

describe('InformativeBlockComponent', () => {
  let component: InformativeBlockComponent;
  let fixture: ComponentFixture<InformativeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformativeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
