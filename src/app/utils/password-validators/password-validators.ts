import { Component } from '@angular/core';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// 1. Password Strength Validator (Enforces regex requirements)
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Don't validate empty values; leave that to Validators.required
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

    return !passwordValid
      ? {
          passwordStrength: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecial,
          },
        }
      : null;
  };
}

export function confirmPasswordValidator(
  passwordControlName: string,
  confirmControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName);
    const confirmControl = control.get(confirmControlName);

    if (!passwordControl || !confirmControl) {
      return null;
    }

    // Set errors directly on the confirm control so it registers natively in the template
    if (passwordControl.value !== confirmControl.value) {
      confirmControl.setErrors({ ...confirmControl.errors, passwordMismatch: true });
    } else {
      // Remove only the mismatch error if it exists, preserving other validations like required
      if (confirmControl.errors) {
        const { passwordMismatch, ...remainingErrors } = confirmControl.errors;
        confirmControl.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
      }
    }

    return null;
  };
}
