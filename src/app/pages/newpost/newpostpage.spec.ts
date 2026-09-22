import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostPage } from './newpostpage';

describe('Newpost', () => {
  let component: NewPostPage;
  let fixture: ComponentFixture<NewPostPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPostPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPostPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
