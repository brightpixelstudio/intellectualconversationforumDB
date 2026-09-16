import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiServiceUser } from '../../services/userservice';
import { GetAllProfileMembers } from '../../models/getallprofilemembers';
import { GetNewestMembers } from '../../models/getnewestmembers';
import { GetMostPostsMembers } from '../../models/getmostpostsmembers';
import { GetLatestLoginsMembers } from '../../models/getlatestloginsmembers';
import { MemberReportType } from '../../enums/memberreportype';

@Component({
  selector: 'members',
  imports: [DatePipe],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit {
  memberListGetAllProfile: GetAllProfileMembers[] = [];
  memberListGetNewestMembers: GetNewestMembers[] = [];
  memberListMostPostsMembers: GetMostPostsMembers[] = [];
  memberListLatestLoginsMembers: GetLatestLoginsMembers[] = [];
  protected MemberReportType = MemberReportType;
  reportType = MemberReportType.All;

  constructor(
    private apiService: ApiServiceUser,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.onMemberTypeChange('all');
  }

  onMemberTypeChange(value: string) {
    // Load the correct data
    switch (value) {
      case 'all':
        this.reportType = MemberReportType.All;
        this.apiService.getAllProfileMembers().subscribe((data: GetAllProfileMembers[]) => {
          this.memberListGetAllProfile = data;
          this.cdr.detectChanges();
        });
        break;

      case 'newest':
        this.reportType = MemberReportType.Newest;
        this.apiService.getNewestMembers().subscribe((data: GetNewestMembers[]) => {
          this.memberListGetNewestMembers = data;
          this.cdr.detectChanges();
        });
        break;

      case 'mostposts':
        this.reportType = MemberReportType.MostPosts;
        this.apiService.getMostPostsMembers().subscribe((data: GetMostPostsMembers[]) => {
          this.memberListMostPostsMembers = data;
          this.cdr.detectChanges();
        });
        break;

      case 'lastlogin':
        this.reportType = MemberReportType.LastLogin;
        this.apiService.getLatestLoginsMembers().subscribe((data: GetLatestLoginsMembers[]) => {
          this.memberListLatestLoginsMembers = data;
          this.cdr.detectChanges();
        });
        break;
    }
  }
}
