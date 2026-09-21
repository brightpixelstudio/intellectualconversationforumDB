import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ApiServiceStatistics } from '../../services/statisticservice';

@Component({
  selector: 'statistics',
  imports: [],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  constructor(
    @Inject(ApiServiceStatistics) private apiService: ApiServiceStatistics,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    //this.loadStatistics();
  }
}
