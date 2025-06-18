import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const endTimeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = group.get('startTime')?.value;
  const end = group.get('endTime')?.value;

  if (!start || !end) return null;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours >= 1 && diffInHours <= 2) {
    return null; // valid
  }

  return { durationInvalid: true };
};
