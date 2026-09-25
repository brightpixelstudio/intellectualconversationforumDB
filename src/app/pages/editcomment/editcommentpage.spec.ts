import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentPage } from './editcommentpage';

describe('Editcomment', () => {
  let component: EditCommentPage;
  let fixture: ComponentFixture<EditCommentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCommentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
