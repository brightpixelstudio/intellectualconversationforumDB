import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  passwordStrengthValidator,
  confirmPasswordValidator,
} from '../../utils/password-validators/password-validators';
import { profanityValidator } from '../../utils/bad-words-validator';
import { ApiServiceUser } from '../../services/userservice';

@Component({
  selector: 'registration',
  imports: [ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration implements OnInit {
  registerForm!: FormGroup;
  recipientEmail = 'brightpixelstudios@gmail.com';
  showSuccess = false;
  showError = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceUser,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          profanityValidator(),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(/^\S*$/),
          profanityValidator(),
        ]),
        email: ['', [Validators.required, Validators.email]],
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern(/^[0-9]*$/),
        ]),
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8), // Native length check
            passwordStrengthValidator(), // Custom strength check
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        profile: new FormControl('', [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(1000),s
          profanityValidator(),
        ]),
      },
      {
        // Apply cross-field validation rules to the whole FormGroup
        validators: [confirmPasswordValidator('password', 'confirmPassword')],
      },
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.showSuccess = false;
    this.showError = false;

    if (this.registerForm.valid) {
      // Pass the raw form values to your service
      this.apiService.submitRegistrationForm(this.registerForm.value).subscribe({
        next: (response) => {
          this.registerForm.reset();
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
