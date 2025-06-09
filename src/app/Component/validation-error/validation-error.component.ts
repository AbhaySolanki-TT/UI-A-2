import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-validation-error',
  imports: [NgIf, MatError],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.css'
})
export class ValidationErrorComponent {
  @Input() control!: AbstractControl | null;
}
