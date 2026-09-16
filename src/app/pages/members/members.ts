import { Component } from '@angular/core';
import { Members } from '../../sections/members/members';

@Component({
  selector: 'page-members',
  imports: [Members],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class MembersPage {}
