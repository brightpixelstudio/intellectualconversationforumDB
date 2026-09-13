import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordValidators } from './password-validators';

describe('PasswordValidators', () => {
  let component: PasswordValidators;
  let fixture: ComponentFixture<PasswordValidators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordValidators],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordValidators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
