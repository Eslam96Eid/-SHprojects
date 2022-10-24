import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharjahAuthorityComponent } from './sharjah-authority.component';

describe('SharjahAuthorityComponent', () => {
  let component: SharjahAuthorityComponent;
  let fixture: ComponentFixture<SharjahAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharjahAuthorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharjahAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
