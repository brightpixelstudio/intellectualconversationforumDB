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

@Component({
  selector: 'content',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements OnInit {
  registerForm!: FormGroup;
  recipientEmail = 'brightpixelstudios@gmail.com';
  //userForm = { username: '', email: '', password: '', profile: '' };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: new FormControl('', [Validators.required, Validators.minLength(7)]),
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8), // Native length check
            passwordStrengthValidator(), // Custom strength check
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        profile: new FormControl('', [Validators.required, Validators.minLength(30)]),
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
    if (form.valid) {


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
