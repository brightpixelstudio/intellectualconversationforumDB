import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile } from './editprofile';

describe('Editprofile', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
