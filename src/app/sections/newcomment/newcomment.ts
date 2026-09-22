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

@Component({
  selector: 'newcomment',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './newcomment.html',
  styleUrl: './newcomment.css',
})
export class NewComment implements OnInit {
  userList!: any[];
  // TODO
  postId: number = 1;
  userId: number = 1;

  commentForm!: FormGroup;
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
    this.commentForm = this.fb.group({
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
    const postId = this.route.snapshot.queryParamMap.get('postid');
    if (!postId) return;
    this.postId = +postId;
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmit() {
    this.showSuccess = false;
    this.showError = false;

    if (this.commentForm.valid) {
      // Pass the raw form values to your service
      this.userId = 0;
      this.apiServicePost
        .submitNewCommentForm(this.postId, this.userId, this.commentForm.value)
        .subscribe({
          next: (response) => {
            this.commentForm.reset();
            this.showSuccess = true;
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
