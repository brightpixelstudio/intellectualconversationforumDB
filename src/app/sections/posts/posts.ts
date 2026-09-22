import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiServiceUser } from '../../services/userservice';
import { ApiServiceUtility } from '../../services/utilityservice';
import { ApiServicePost } from '../../services/postservice';
import { forkJoin } from 'rxjs';
import { GetPostsByCategoryUser } from '../../models/posts/getpostsbycategoryuser';

@Component({
  selector: 'posts',
  imports: [DatePipe, FontAwesomeModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  noPosts: boolean = true;
  userid: number | null = null;
  catagoryid: number | null = null;
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
        this.cdr.detectChanges();

        this.loadPosts();
      },
      error: (err) => console.error('One of the requests failed!', err),
    });
  }

  loadPosts() {
    this.apiServicePost.getPosts(this.catagoryid, this.userid).subscribe({
      next: (data) => {
        this.postsList = data;
        this.noPosts = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.noPosts = true;
        this.cdr.detectChanges();
      },
    });
  }

  // events
  onCatagoryChange(catagory: string) {
    this.catagoryid = +catagory;
    this.loadPosts();
  }

  onUserChange(user: string) {
    this.userid = +user;
    this.loadPosts();
  }

  // helpers
  getTimePassed(postDate: Date): string {
    const currentDate: Date = new Date();
    const newPostDate: Date = new Date(postDate);

    const diffInSeconds = Math.abs(newPostDate.getTime() - currentDate.getTime()) / 1000;

    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((diffInSeconds / 60) % 60);

    let posted: string = `Posted `;
    if (days > 0) {
      posted += `${days} days, ${hours} hours, ${minutes} minutes ago`;
    } else if (hours > 0) {
      posted += `${hours} hours, ${minutes} minutes ago`;
    } else {
      posted += `${minutes} minutes ago`;
    }
    return posted;
  }
}
