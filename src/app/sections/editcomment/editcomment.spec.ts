import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComment } from './editcomment';

describe('Editcomment', () => {
  let component: EditComment;
  let fixture: ComponentFixture<EditComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComment],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
