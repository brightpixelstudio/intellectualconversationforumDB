import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPage } from './members';

describe('Members', () => {
  let component: MembersPage;
  let fixture: ComponentFixture<MembersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MembersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
