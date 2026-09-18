import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatisticsPage } from './memberstatistics';

describe('Memberstatistics', () => {
  let component: MemberStatisticsPage;
  let fixture: ComponentFixture<MemberStatisticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberStatisticsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberStatisticsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
