import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '../../core/Interfaces/UserInfo';

@Component({
  selector: 'app-edit-user',
  imports: [],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editDialog: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo
  ){
    this.userForm = this.fb.group({
      id: [data.id],
      firsName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      dateOfBirth: [data.dateOfBirth, [Validators.required]]
    })
  }
}
