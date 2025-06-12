import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorComponent } from "../../validation-error/validation-error.component";
import { Role } from '../../../core/Interfaces/Role';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-role',
  imports: [NgFor,NgIf, ReactiveFormsModule, MatFormField, MatInputModule, ValidationErrorComponent, MatOptionModule, MatSelectModule],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent {
  roleForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private editDialog: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Role
  ) {

    if (data) {
      this.roleForm = this.fb.group({
        id: [data.id],
        name: [data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      })
    } else {
      this.roleForm = this.fb.group({
        id: [],
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      })
    }
  }

  save() {
    if (this.roleForm.valid) {
      this.editDialog.close(this.roleForm.value);
    }
    else {
      this.roleForm.markAllAsTouched();
    }
  }

  cancel() { this.editDialog.close(false); }
}
