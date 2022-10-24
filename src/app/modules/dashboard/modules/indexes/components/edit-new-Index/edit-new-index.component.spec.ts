import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewIndexComponent } from './edit-new-index.component';

describe('EditNewIndexComponent', () => {
  let component: EditNewIndexComponent;
  let fixture: ComponentFixture<EditNewIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
