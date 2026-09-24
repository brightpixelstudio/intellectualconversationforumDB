import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiServiceUser } from '../../services/userservice';
import { ApiServiceUtility } from '../../services/utilityservice';
import { ApiServicePost } from '../../services/postservice';
import { forkJoin } from 'rxjs';
import { GetPostsByCategoryUser } from '../../models/posts/getpostsbycategoryuser';
import { GetPostComments } from '../../models/posts/getpostcomments';

@Component({
  selector: 'posts',
  imports: [DatePipe, FontAwesomeModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  noPosts: boolean = false;
  postId: number = 0;
  userid: number | null = null;
  catagoryid: number | null = null;
  userList!: any[];
  catagoryList!: any[];
  hiddenButtonIds = new Set<string>();
  postsList: GetPostsByCategoryUser[] = [];
  commentList: GetPostComments[] = [];

  constructor(
    private apiServiceUser: ApiServiceUser,
    private apiServiceUtilities: ApiServiceUtility,
    private apiServicePost: ApiServicePost,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
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
      next: (data: GetPostsByCategoryUser[]) => {
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

  onCommentsClick(postId: string) {
    // add to the hide button list
    this.hiddenButtonIds.add(postId);

    // get the element from the list
    const post = this.postsList.find((post) => post.postid === +postId);

    if (post) {
      this.postId = +postId;
      // get the comments
      this.apiServicePost.getComments(+postId).subscribe({
        next: (data: GetPostComments[]) => {
          // we add to the comment list in case they want to delete one.
          this.commentList = [...this.commentList, ...data];
          let comments = this.buildCommemts();
          console.log('Comments', this.commentList);

          // set the comments
          let content = `<div class="row mt-3 ms-4"><div class="col-11">${comments}</div></row>`;
          post.comments = content;
          this.cdr.detectChanges();
        },
        error: (_err: unknown) => {},
      });
    }
  }

  onDeletePostClick(postId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.apiServicePost.deletePost(postId).subscribe({
        next: (response) => {
          // remove the record from the lists
          this.removeItem(this.postsList, (post) => post.postid === postId);
          this.cdr.detectChanges();
        },
        error: (error) => {
          window.alert('Error deleting this post');
        },
      });
    }
  }

  onDeleteCommentClick(event: MouseEvent) {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      // remove the record from the list
      const target = event.target as HTMLElement;

      // Check if the clicked element or its parent matches your target class
      if (target && target.classList.contains('dynamic-btn')) {
        // look for the classes
        let commentClass = Array.from(target.classList).find((className) =>
          className.startsWith('comment-'),
        );
        let postClass = Array.from(target.classList).find((className) =>
          className.startsWith('post-'),
        );
        if (!commentClass || !postClass) return;

        // remove all comments in the list for this post
        const postId: string = postClass.substring(postClass.indexOf('-') + 1);
        const commentId: string = commentClass.substring(commentClass.indexOf('-') + 1);

        // delete all these comments from this post
        this.commentList = this.commentList.filter((comment) => comment.postid !== +postId);

        // delete the actual comment
        this.apiServicePost.deleteComment(+commentId).subscribe({
          next: (response) => {
            // reload the comments for this post
            this.onCommentsClick(postId);
            this.cdr.detectChanges();
          },
          error: (error) => {
            window.alert('Error deleting this post');
          },
        });
      }
    }
  }

  // helpers
  removeItem<T>(list: T[], condition: (item: T) => boolean): void {
    const index = list.findIndex(condition);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  buildCommemts(): string {
    // build the content
    let comments: string = '';
    for (const comment of this.commentList) {
      if (this.postId != comment.postid) continue;

      // title
      const newDate = new Date(comment.dateadded);
      const timePassed = this.getTimePassed(newDate);
      const mediumDate = this.mediumDateFormatter.format(newDate);
      let title = `<p class='comment' ><strong>${comment.name}</strong>, <span class="posttitleinfo">${mediumDate}, ${timePassed}</span></p>`;

      // delete button
      let deletebtn = `<div><a class='btn btn-danger dynamic-btn deletecommentbtn mt-2 post-${comment.postid} comment-${comment.postcommentid}'>Delete</a></div>`;

      // comment
      let theComment = comment.comment + deletebtn + '<hr/>';

      // add to the comments
      comments += title + theComment;
    }
    return comments;
  }

  mediumDateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  });

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
