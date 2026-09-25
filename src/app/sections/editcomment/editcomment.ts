import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { profanityValidator } from '../../utils/bad-words-validator';
import { ApiServicePost } from '../../services/postservice';
import { ApiServiceUser } from '../../services/userservice';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GetComment } from '../../models/posts/getcomment';

@Component({
  selector: 'editcomment',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './editcomment.html',
  styleUrl: './editcomment.css',
})
export class EditComment implements OnInit {
  userList!: any[];
  commentId: number = 0;
  getComment: GetComment | null = null;
  updateCommentForm!: FormGroup;
  showSuccess = false;
  showError = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private apiServicePost: ApiServicePost,
    private apiServiceUser: ApiServiceUser,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.updateCommentForm = this.fb.group({
      userid: new FormControl('', [Validators.required]),
      comment: new FormControl('', [
        Validators.required,
        Validators.maxLength(5000),
        profanityValidator(),
      ]),
    });

    forkJoin({
      users: this.apiServiceUser.getUserList(),
    }).subscribe({
      next: (response) => {
        this.userList = response.users;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('One of the requests failed!', err),
    });

    // get the query string value
    const commentId = this.route.snapshot.queryParamMap.get('commentid');
    if (!commentId) return;
    this.commentId = +commentId;

    // load the comment
    this.apiServicePost.getComment(this.commentId).subscribe({
      next: (GetComment) => {
        this.getComment = GetComment[0];
        this.updateCommentForm.patchValue(GetComment[0]);
      },
      error: (err) => console.error('Failed to load post', err),
    });
  }

  get f() {
    return this.updateCommentForm.controls;
  }

  onSubmit() {
    this.showSuccess = false;
    this.showError = false;

    if (this.updateCommentForm.valid) {
      // Pass the raw form values to your service
      this.apiServicePost
        .submitUpdateCommentForm(this.commentId, this.updateCommentForm.value)
        .subscribe({
          next: (response) => {
            this.showSuccess = true;
            this.cdr.detectChanges();
          },
          error: (error: HttpErrorResponse) => {
            // Handle Bad Request (400) or other HTTP errors
            this.showError = true;
            if (error.status === 400) {
              // Fallback to error.message if the backend response didn't include a custom text message
              this.errorMsg =
                error.error?.message || 'Invalid data submitted. Please check your form.';
            } else {
              this.errorMsg = 'An unexpected error occurred. Please try again.';
            }
            this.cdr.detectChanges();
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
