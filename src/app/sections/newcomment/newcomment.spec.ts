import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComment } from './newcomment';

describe('Newcomment', () => {
  let component: NewComment;
  let fixture: ComponentFixture<NewComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewComment],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
