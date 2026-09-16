import { Component, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceUser,
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
    /*
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value); // Access all values as an object

      // Pass the raw form values to your service
      this.apiService.submitRegistrationForm(this.registerForm.value).subscribe({
        next: (response) => console.log('Success!', response),
        error: (err) => console.error('Submission failed', err),
      });
    } else {
      console.log('Form is invalid');
    }
      */
  }
}
