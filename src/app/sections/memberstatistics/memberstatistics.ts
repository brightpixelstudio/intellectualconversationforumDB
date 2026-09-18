import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiServiceUser } from '../../services/userservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'memberstatistics',
  imports: [],
  templateUrl: './memberstatistics.html',
  styleUrl: './memberstatistics.css',
})
export class MemberStatistics implements OnInit {
  userId: number = 0;

  constructor(
    private apiService: ApiServiceUser,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // get the query string value
    const userId = this.route.snapshot.queryParamMap.get('userid');
    if (!userId) return;
    this.userId = +userId;

    /* load the members statistics
    this.apiService.getUserProfile(this.userId).subscribe({
      next: (GetProfileMember) => {
        this.updateProfileForm.patchValue(GetProfileMember[0]);
      },
      error: (err) => console.error('Failed to load user profile', err),
    });
    */
  }
}
