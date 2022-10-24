import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterChildComponent } from './unregister-child.component';

describe('UnregisterChildComponent', () => {
  let component: UnregisterChildComponent;
  let fixture: ComponentFixture<UnregisterChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisterChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
