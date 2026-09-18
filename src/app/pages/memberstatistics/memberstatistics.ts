import { Component } from '@angular/core';
import { MemberStatistics } from '../../sections/memberstatistics/memberstatistics';

@Component({
  selector: 'memberstatisticspage',
  imports: [MemberStatistics],
  templateUrl: './memberstatisticspage.html',
  styleUrl: './memberstatisticspage.css',
})
export class MemberStatisticsPage {}
