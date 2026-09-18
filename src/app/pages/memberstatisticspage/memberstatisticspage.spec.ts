import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatisticsPage } from './memberstatisticspage';

describe('Memberstatisticspage', () => {
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
