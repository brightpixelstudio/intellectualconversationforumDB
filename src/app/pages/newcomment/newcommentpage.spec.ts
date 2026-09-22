import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentPage } from './newcommentpage';

describe('NewCommentPage', () => {
  let component: NewCommentPage;
  let fixture: ComponentFixture<NewCommentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCommentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCommentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
