import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiServiceUser } from '../../services/userservice';
import type { GetAllProfileMembers } from '../../models/getallprofilemembers';

@Component({
  selector: 'members',
  imports: [],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit {
  memberList: GetAllProfileMembers[] = [];

  constructor(
    private apiService: ApiServiceUser,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.apiService.getAllProfileMembers().subscribe((data: GetAllProfileMembers[]) => {
      this.memberList = data;

      this.cdr.detectChanges();
    });
  }
}
