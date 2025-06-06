import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '../../core/Interfaces/UserInfo';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { Role } from '../../core/Interfaces/Role';
import { RoleService } from '../../core/Services/role.service';

@Component({
  selector: 'app-edit-user',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  userForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private editDialog: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo
  ) {

    this.loadRoles();

    if (data) {
      this.userForm = this.fb.group({
        id: [data.id],
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        dateOfBirth: [this.toDateOnly(data.dateOfBirth), Validators.required],
        mobileNo: [data.mobileNo, Validators.required],
        roleName: [data.roleName, Validators.required],
        roleId: [data.roleId, Validators.required],
        joiningDate: [this.toDateOnly(data.joiningDate), Validators.required],
      })
    } else {
      this.userForm = this.fb.group({
        id: [],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required,],
        dateOfBirth: [new Date(), Validators.required],
        mobileNo: ['', Validators.required],
        roleName: ['', Validators.required],
        roleId: [2, Validators.required],
        joiningDate: [this.toDateOnly(new Date()), Validators.required],
      })
    }
  }

  save() {
    if (this.userForm.valid) {
      this.editDialog.close(this.userForm.value);
    }
  }

  cancel() { this.editDialog.close(false); }

  private toDateOnly(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onRoleChange(event: any) {
    const selectedRole = this.roles.find(r => r.id === event.value);
    if (selectedRole) {
      this.userForm.patchValue({ roleName: selectedRole.name });
    }
  }

  loadRoles() {
    this.roleService.GetAll({}).subscribe((res) => {
      if (res.isSuccess) {
        console.log(res);
        this.roles = res.data;
      }
    })
  }
}
