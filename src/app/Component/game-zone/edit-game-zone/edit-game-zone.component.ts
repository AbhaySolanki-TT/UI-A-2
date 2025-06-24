import { Component, Inject } from '@angular/core';
import { GameZone, GameZoneStatus } from '../../../core/Interfaces/GameZone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-game-zone',
  imports: [
    ReactiveFormsModule, MatFormFieldModule, 
    NgFor, NgIf, MatInputModule, MatError, 
    MatOptionModule, NgClass, MatHint, 
    MatIconModule, MatInputModule, 
    MatSelectModule, MatOptionModule, 
  ],
  templateUrl: './edit-game-zone.component.html',
  styleUrl: './edit-game-zone.component.css'
})
export class EditGameZoneComponent {
  gameZoneForm: FormGroup;

  // Status options for dropdown
  statusOptions = [
    { value: GameZoneStatus.Available, label: 'Available' },
    { value: GameZoneStatus.Engaged, label: 'Engaged' },
    { value: GameZoneStatus.Maintenance, label: 'Maintenance' },
    { value: GameZoneStatus.Unknown, label: 'Unknown' }
  ];

  // Player count constraints
  playerConstraints = {
    minPlayers: {
      min: 1,
      max: 50
    },
    maxPlayers: {
      min: 1,
      max: 100
    }
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditGameZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameZone | null
  ) {
    this.gameZoneForm = this.fb.group({
      
      id: [data?.id || null],
      name: [data?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [data?.description || '', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      minPlayers: [data?.minPlayers || 1, [
        Validators.required,
        Validators.min(this.playerConstraints.minPlayers.min),
        Validators.max(this.playerConstraints.minPlayers.max)
      ]],
      maxPlayers: [data?.maxPlayers || 2, [
        Validators.required,
        Validators.min(this.playerConstraints.maxPlayers.min),
        Validators.max(this.playerConstraints.maxPlayers.max)
      ]],
      status: [data?.status ?? GameZoneStatus.Available, [Validators.required]]
    }, { validators: this.playersValidator });
  }

  ngOnInit() {
    // Set up dynamic validation for player counts
    this.gameZoneForm.get('minPlayers')?.valueChanges.subscribe(() => {
      this.gameZoneForm.get('maxPlayers')?.updateValueAndValidity();
    });

    console.log('Edit Game Zone Data:', this.data);
  }

  // Custom validator to ensure maxPlayers >= minPlayers
  private playersValidator(group: FormGroup) {
    const minPlayers = group.get('minPlayers')?.value;
    const maxPlayers = group.get('maxPlayers')?.value;

    if (minPlayers && maxPlayers && maxPlayers < minPlayers) {
      return { playersInvalid: true };
    }
    return null;
  }

  save() {
    if (this.gameZoneForm.valid) {
      const formValue = this.gameZoneForm.value;

      const payload: GameZone = {
        id: formValue.id,
        name: formValue.name.trim(),
        description: formValue.description.trim(),
        minPlayers: Number(formValue.minPlayers),
        maxPlayers: Number(formValue.maxPlayers),
        status: Number(formValue.status)
      };

      this.dialogRef.close(payload);
    } else {
      this.gameZoneForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  // Helper method to get status label for display
  getStatusLabel(status: GameZoneStatus): string {
    return GameZoneStatus[status] || 'Unknown';
  }

  // Validation helper methods for template
  hasError(controlName: string, errorType: string): boolean {
    const control = this.gameZoneForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.gameZoneForm.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return `${this.getFieldLabel(controlName)} is required`;
    if (errors['minlength']) return `${this.getFieldLabel(controlName)} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${this.getFieldLabel(controlName)} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors['min']) return `${this.getFieldLabel(controlName)} must be at least ${errors['min'].min}`;
    if (errors['max']) return `${this.getFieldLabel(controlName)} cannot exceed ${errors['max'].max}`;

    return '';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'Zone name',
      'description': 'Description',
      'minPlayers': 'Minimum players',
      'maxPlayers': 'Maximum players',
      'status': 'Status'
    };
    return labels[controlName] || controlName;
  }
}
