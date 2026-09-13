import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Filter } from 'bad-words';

export function profanityValidator(): ValidatorFn {
  const filter = new Filter();

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Return valid if the field is empty
    }

    // Check if the input contains profanity
    const hasProfanity = filter.isProfane(control.value);

    // Return an error object if profanity is found, otherwise return null
    return hasProfanity ? { profanity: true } : null;
  };
}
