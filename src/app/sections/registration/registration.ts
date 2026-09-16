import { Component, OnInit, inject } from '@angular/core';
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

@Component({
  selector: 'registration',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration implements OnInit {
  registerForm!: FormGroup;
  recipientEmail = 'brightpixelstudios@gmail.com';

  constructor(private fb: FormBuilder) {}

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
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value); // Access all values as an object
    } else {
      console.log('Form is invalid');
    }

    /*
    if (this.registerForm.valid {

      // is the username email address already taken? (API) or is this email blocked or suspended?
      
      const subject = encodeURIComponent('Intellectual Conversation Forum Sign-up');
      const body = encodeURIComponent(
        `Username: ${form.value.username}\nEmail: ${form.value.email}\nPassword: ${form.value.password}\nProfile: ${form.value.profile}`,
      );

      // Build the finalized mailto string
      const mailtoUrl = `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;

      // Trigger the operating system's default email client
      window.open(mailtoUrl, '_blank');
    }
    */
  }
}
