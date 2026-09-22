import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiServiceUser } from '../../services/userservice';
import { ApiServiceUtility } from '../../services/utilityservice';
import { ApiServicePost } from '../../services/postservice';
import { forkJoin } from 'rxjs';
import { GetPostsByCategoryUser } from '../../models/member/getpostsbycategoryuser';

@Component({
  selector: 'posts',
  imports: [DatePipe, FontAwesomeModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  userid: number | undefined;
  catagoryid: number | undefined;
  userList!: any[];
  catagoryList!: any[];
  postsList: GetPostsByCategoryUser[] = [];

  constructor(
    private apiServiceUser: ApiServiceUser,
    private apiServiceUtilities: ApiServiceUtility,
    private apiServicePost: ApiServicePost,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    forkJoin({
      users: this.apiServiceUser.getUserList(),
      catagories: this.apiServiceUtilities.getCatagoryList(),
    }).subscribe({
      next: (response) => {
        this.userList = response.users;
        this.catagoryList = response.catagories;

        this.getPosts();
      },
      error: (err) => console.error('One of the requests failed!', err),
    });
  }

  getPosts() {
    this.apiServicePost
      .getPosts(this.catagoryid, this.userid)
      .subscribe((data: GetPostsByCategoryUser[]) => {
        this.postsList = data;
        this.cdr.detectChanges();
      });
  }
}
